require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/db');
const rutasEnvios = require('./routes/envios');
const Envio = require('./models/Envio');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API FastShip funcionando correctamente'
    });
});

app.use('/api/envios', rutasEnvios);

// Manejo de rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'Ruta no encontrada'
    });
});

// Manejo de errores
app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            mensaje: 'JSON no válido'
        });
    }

    res.status(500).json({
        mensaje: 'Error interno del servidor'
    });
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    await conectarDB();
    await Envio.init();

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
};

iniciarServidor().catch(error => {
    console.error('Error al iniciar:', error.message);
    process.exit(1);
});