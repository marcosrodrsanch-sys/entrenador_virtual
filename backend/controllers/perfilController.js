const { pool } = require('../config/database');

// Obtener perfil del usuario autenticado
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [profiles] = await pool.execute(
            `SELECT 
                u.email,
                u.first_name,
                u.last_name,
                p.*
            FROM users u
            LEFT JOIN user_profiles p ON u.id = p.user_id
            WHERE u.id = ?`,
            [userId]
        );
        
        if (profiles.length === 0) {
            return res.status(404).json({ 
                error: 'Usuario no encontrado' 
            });
        }
        
        const profile = profiles[0];
        
        // Si no tiene perfil creado aún
        if (!profile.age) {
            return res.json({
                message: 'Perfil no completado',
                user: {
                    id: userId,
                    email: profile.email,
                    firstName: profile.first_name,
                    lastName: profile.last_name
                },
                profile: null
            });
        }
        
        res.json({
            user: {
                id: userId,
                email: profile.email,
                firstName: profile.first_name,
                lastName: profile.last_name
            },
            profile: {
                age: profile.age,
                weight: profile.weight,
                height: profile.height,
                gender: profile.gender,
                fitnessLevel: profile.fitness_level,
                primaryGoal: profile.primary_goal,
                trainingDays: profile.training_days_per_week,
                limitations: profile.limitations
            }
        });
        
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({ 
            error: 'Error al obtener perfil' 
        });
    }
};


//Crear-Actualizar el perfil
const createOrUpdateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            age,
            weight,
            height,
            gender,
            fitnessLevel,
            primaryGoal,
            trainingDays,
            limitations
        } = req.body;
        
        // Validaciones básicas
        if (!age || !weight || !height || !fitnessLevel || !primaryGoal || !trainingDays) {
            return res.status(400).json({
                error: 'Todos los campos obligatorios deben ser completados'
            });
        }
        
        // Validar edad
        if (age < 16 || age > 100) {
            return res.status(400).json({
                error: 'La edad debe estar entre 16 y 100 años'
            });
        }
        
        // Validar peso
        if (weight < 30 || weight > 300) {
            return res.status(400).json({
                error: 'El peso debe estar entre 30 y 300 kg'
            });
        }
        
        // Validar altura
        if (height < 100 || height > 250) {
            return res.status(400).json({
                error: 'La altura debe estar entre 100 y 250 cm'
            });
        }
        
        // Validar días de entrenamiento
        if (trainingDays < 1 || trainingDays > 7) {
            return res.status(400).json({
                error: 'Los días de entrenamiento deben estar entre 1 y 7'
            });
        }
        
        // Verificar si el perfil ya existe
        const [existingProfile] = await pool.execute(
            'SELECT id FROM user_profiles WHERE user_id = ?',
            [userId]
        );
        
        if (existingProfile.length > 0) {
            // ACTUALIZAR perfil existente
            await pool.execute(
                `UPDATE user_profiles 
                SET age = ?, weight = ?, height = ?, gender = ?, 
                    fitness_level = ?, primary_goal = ?, 
                    training_days_per_week = ?, limitations = ?
                WHERE user_id = ?`,
                [age, weight, height, gender, fitnessLevel, 
                 primaryGoal, trainingDays, limitations || null, userId]
            );
            
            res.json({
                message: 'Perfil actualizado exitosamente',
                profile: req.body
            });
        } else {
            // CREAR nuevo perfil
            await pool.execute(
                `INSERT INTO user_profiles 
                (user_id, age, weight, height, gender, fitness_level, 
                 primary_goal, training_days_per_week, limitations)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [userId, age, weight, height, gender || null, 
                 fitnessLevel, primaryGoal, trainingDays, limitations || null]
            );
            
            res.status(201).json({
                message: 'Perfil creado exitosamente',
                profile: req.body
            });
        }
        
    } catch (error) {
        console.error('Error en perfil:', error);
        res.status(500).json({ 
            error: 'Error al guardar perfil' 
        });
    }
};


//Eliminar perfil
const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        await pool.execute(
            'DELETE FROM user_profiles WHERE user_id = ?',
            [userId]
        );
        
        res.json({
            message: 'Perfil eliminado exitosamente'
        });
        
    } catch (error) {
        console.error('Error eliminando perfil:', error);
        res.status(500).json({ 
            error: 'Error al eliminar perfil' 
        });
    }
};

// Exportar todas las funciones
module.exports = {
    getProfile,
    createOrUpdateProfile,
    deleteProfile
};