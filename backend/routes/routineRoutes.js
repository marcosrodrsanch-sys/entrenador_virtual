const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    createAIRoutine,
    getUserRoutines,
    getActiveRoutine,
    getRoutineById
} = require('../controllers/routineController');


router.get('/test', (req, res) => {
    res.json({ message: 'Rutas de rutinas funcionando!' });
});


//Autenticacion
router.use(authMiddleware);

//Generar rutina con IA
router.post('/generate', createAIRoutine);

//Obtener todas las rutinas
router.get('/', getUserRoutines);

//Obtener rutina activa actual
router.get('/active', getActiveRoutine);

//Obtener rutina especifica
router.get('/:id', getRoutineById);

module.exports = router;