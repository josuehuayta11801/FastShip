const express = require('express');
const router = express.Router();
const controller = require('../controllers/enviosController');

// Registrar un nuevo envío
router.post('/', controller.crearEnvio);

// Consultar todos los envíos
router.get('/', controller.obtenerEnvios);

// Consultar envíos activos
router.get('/activos', controller.obtenerActivos);

// Buscar envío por ID
router.get('/:id', controller.obtenerEnvioPorId);

// Actualizar estado del envío
router.put('/:id', controller.actualizarEnvio);

// Eliminar un envío
router.delete('/:id', controller.eliminarEnvio);

module.exports = router;