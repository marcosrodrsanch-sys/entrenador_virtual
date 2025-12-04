// Cargar variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const perfilRutas = require('./routes/perfilRoutes');
const routineRoutes = require('./routes/routineRoutes');
const { connectDB } = require('./config/database');

// Crear aplicación Express
const app = express();

// Conectar a base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/profile', perfilRutas);
app.use('/api/routines', routineRoutes);
console.log('Rutas de rutinas cargadas');



// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: '🏋️ API Entrenador Virtual',
        version: '1.0.0',
        estado: 'Servidor funcionando correctamente',
        endpoints: {
            registro: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            obtenerPerfil: 'GET /api/profile (requiere token)',
            crearPerfil: 'POST /api/profile (require token)',
            actualizarPerfil: 'PUT /api/profile (requiere token)',
            eliminarPerfil: 'DELETE /api/profile (requiere token)'
        },
        timestamp: new Date()
    });
});

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.originalUrl 
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message 
    });
});

// Configurar puerto y arrancar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🏃 Modo: ${process.env.NODE_ENV || 'development'}`);
   
});