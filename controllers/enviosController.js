const Envio = require('../models/Envio');

// Manejo de errores
const manejarError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            mensaje: 'El ID del pedido ya existe'
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            mensaje: 'Datos no válidos',
            error: error.message
        });
    }

    return res.status(500).json({
        mensaje: 'Error interno del servidor'
    });
};

// Registrar un nuevo envío
exports.crearEnvio = async (req, res) => {
    try {
        const {
            idPedido,
            remitente,
            destinatario,
            direccionEntrega,
            estado
        } = req.body;

        const envio = await Envio.create({
            idPedido,
            remitente,
            destinatario,
            direccionEntrega,
            estado
        });

        res.status(201).json(envio);
    } catch (error) {
        manejarError(res, error);
    }
};

// Consultar todos los envíos
exports.obtenerEnvios = async (req, res) => {
    try {
        const envios = await Envio.find();
        res.status(200).json(envios);
    } catch (error) {
        manejarError(res, error);
    }
};

// Consultar envíos activos
exports.obtenerActivos = async (req, res) => {
    try {
        const envios = await Envio.find({
            estado: {
                $in: ['pendiente', 'en tránsito']
            }
        });

        res.status(200).json(envios);
    } catch (error) {
        manejarError(res, error);
    }
};

// Buscar envío por ID del pedido
exports.obtenerEnvioPorId = async (req, res) => {
    try {
        const envio = await Envio.findOne({
            idPedido: req.params.id
        });

        if (!envio) {
            return res.status(404).json({
                mensaje: 'Envío no encontrado'
            });
        }

        res.status(200).json(envio);
    } catch (error) {
        manejarError(res, error);
    }
};

// Actualizar el estado del envío
exports.actualizarEnvio = async (req, res) => {
    try {
        const { estado } = req.body;

        if (!['pendiente', 'en tránsito', 'entregado'].includes(estado)) {
            return res.status(400).json({
                mensaje: 'Estado no válido'
            });
        }

        const envio = await Envio.findOneAndUpdate(
            { idPedido: req.params.id },
            { estado },
            { new: true, runValidators: true }
        );

        if (!envio) {
            return res.status(404).json({
                mensaje: 'Envío no encontrado'
            });
        }

        res.status(200).json(envio);
    } catch (error) {
        manejarError(res, error);
    }
};

// Eliminar un envío
exports.eliminarEnvio = async (req, res) => {
    try {
        const envio = await Envio.findOneAndDelete({
            idPedido: req.params.id
        });

        if (!envio) {
            return res.status(404).json({
                mensaje: 'Envío no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Envío eliminado correctamente'
        });
    } catch (error) {
        manejarError(res, error);
    }
};