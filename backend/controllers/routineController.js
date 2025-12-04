const { pool } = require('../config/database');
const { generateRoutine } = require('../services/aiService');

// Generar nueva rutina con IA
const createAIRoutine = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Obtener perfil del usuario
        const [profiles] = await pool.execute(
            `SELECT * FROM user_profiles WHERE user_id = ?`,
            [userId]
        );
        
        if (profiles.length === 0) {
            return res.status(400).json({
                error: 'Debes completar tu perfil antes de generar una rutina'
            });
        }
        
        const userProfile = profiles[0];
        
        // Verificar que el perfil esté completo
        if (!userProfile.age || !userProfile.fitness_level || !userProfile.primary_goal) {
            return res.status(400).json({
                error: 'Tu perfil está incompleto. Por favor, actualízalo primero'
            });
        }
        
        console.log('Generando rutina para usuario:', userId);
        
        // Generar rutina con IA
        const generatedRoutine = await generateRoutine({
            age: userProfile.age,
            weight: userProfile.weight,
            height: userProfile.height,
            gender: userProfile.gender,
            fitnessLevel: userProfile.fitness_level,
            primaryGoal: userProfile.primary_goal,
            trainingDays: userProfile.training_days_per_week,
            limitations: userProfile.limitations
        });
        
        // Guardar en base de datos
        const routineData = JSON.stringify(generatedRoutine);
        const routineName = generatedRoutine.nombreRutina || 'Rutina personalizada';
        const routineDescription = generatedRoutine.descripcion || 'Rutina generada por IA';
        
        const [result] = await pool.execute(
            `INSERT INTO routines (user_id, name, description, routine_data, difficulty, duration_weeks, ai_generated, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                routineName,
                routineDescription,
                routineData,
                userProfile.fitness_level,
                4, // 4 semanas por defecto
                true,
                true
            ]
        );
        
        console.log('Rutina guardada con ID:', result.insertId);
        
        res.status(201).json({
            message: 'Rutina generada exitosamente',
            routineId: result.insertId,
            routine: generatedRoutine
        });
        
    } catch (error) {
        console.error('Error generando rutina:', error);
        res.status(500).json({
            error: 'Error al generar rutina',
            details: error.message
        });
    }
};

// Obtener todas las rutinas del usuario
const getUserRoutines = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [routines] = await pool.execute(
            `SELECT id, name, description, difficulty, duration_weeks, 
                    ai_generated, is_active, created_at
             FROM routines 
             WHERE user_id = ? 
             ORDER BY created_at DESC`,
            [userId]
        );
        
        res.json({
            message: 'Rutinas obtenidas exitosamente',
            count: routines.length,
            routines
        });
        
    } catch (error) {
        console.error('Error obteniendo rutinas:', error);
        res.status(500).json({
            error: 'Error al obtener rutinas'
        });
    }
};

// Obtener rutina activa actual
const getActiveRoutine = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [routines] = await pool.execute(
            `SELECT * FROM routines 
             WHERE user_id = ? AND is_active = true 
             ORDER BY created_at DESC 
             LIMIT 1`,
            [userId]
        );
        
        if (routines.length === 0) {
            return res.status(404).json({
                message: 'No tienes una rutina activa'
            });
        }
        
        const routine = routines[0];
        routine.routine_data = JSON.parse(routine.routine_data);
        
        res.json({
            message: 'Rutina activa obtenida',
            routine
        });
        
    } catch (error) {
        console.error('Error obteniendo rutina activa:', error);
        res.status(500).json({
            error: 'Error al obtener rutina activa'
        });
    }
};

// Obtener rutina específica por ID
const getRoutineById = async (req, res) => {
    try {
        const userId = req.user.id;
        const routineId = req.params.id;
        
        const [routines] = await pool.execute(
            `SELECT * FROM routines 
             WHERE id = ? AND user_id = ?`,
            [routineId, userId]
        );
        
        if (routines.length === 0) {
            return res.status(404).json({
                error: 'Rutina no encontrada'
            });
        }
        
        const routine = routines[0];
        routine.routine_data = JSON.parse(routine.routine_data);
        
        res.json({
            message: 'Rutina obtenida exitosamente',
            routine
        });
        
    } catch (error) {
        console.error('Error obteniendo rutina:', error);
        res.status(500).json({
            error: 'Error al obtener rutina'
        });
    }
};

// Exportar todas las funciones
module.exports = {
    createAIRoutine,
    getUserRoutines,
    getActiveRoutine,
    getRoutineById
};