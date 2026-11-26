const mongoose = require('mongoose');

const envioSchema = new mongoose.Schema({
    idPedido: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    remitente: {
        type: String,
        required: true,
        trim: true
    },
    destinatario: {
        type: String,
        required: true,
        trim: true
    },
    direccionEntrega: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en tránsito', 'entregado'],
        default: 'pendiente',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Envio', envioSchema);