const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const{
    getProfile,
    createOrUpdateProfile,
    deleteProfile
} = require('../controllers/perfilController');


// 🔴 RUTA DE PRUEBA TEMPORAL - AGREGAR AQUÍ 🔴
router.get('/test', (req, res) => {
    res.json({ 
        message: 'Ruta de prueba funciona',
        headers: req.headers.authorization 
    });
});


//Todas las rutas requieren autenticación
router.use(authMiddleware);

//Obtener perfil del usuario autenticado(GET)
router.get('/', getProfile);

//Crea-Actualiza perfil(POST)
router.post('/', createOrUpdateProfile);

//Actualizar perfil
router.put('/', createOrUpdateProfile);

//Eliminar perfil
router.delete('/', deleteProfile);

module.exports = router;