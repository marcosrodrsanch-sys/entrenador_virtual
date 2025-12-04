const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Registrar nuevo usuario
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        
        // Validaciones
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email y contraseña son requeridos'
            });
        }
        
        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        
        if (existingUsers.length > 0) {
            return res.status(409).json({
                error: 'El email ya está registrado'
            });
        }
        
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insertar usuario
        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, firstName || null, lastName || null]
        );
        
        // Crear token JWT
        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: result.insertId,
                email,
                firstName,
                lastName
            }
        });
        
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            error: 'Error al registrar usuario'
        });
    }
};

// Login de usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validaciones
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email y contraseña son requeridos'
            });
        }
        
        // Buscar usuario
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND is_active = true',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(401).json({
                error: 'Credenciales inválidas'
            });
        }
        
        const user = users[0];
        
        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Credenciales inválidas'
            });
        }
        
        console.log('JWT_SECRET en login:', process.env.JWT_SECRET);
        console.log('Usuario ID:', user.id);
        console.log('Usuario email:', user.email);
        
        // Crear token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        
        console.log('Token generado en login:', token);
        
        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            error: 'Error al iniciar sesión'
        });
    }
};

module.exports = {
    register,
    login
};