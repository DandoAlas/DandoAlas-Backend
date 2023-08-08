'use strict';
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    nacimiento: Date,
    correo: String,
    identificacion: String,
    telefono: String,
    vueloReservados: [{
        numeroVuelo: Number,
        numeroAsiento: Number,
        estado: String,
    }],
    metodosDePago: [{
        cuetaPaypal: String,
        tarjetasCredito: [{
            numeroTarjeta: String,
        }],
    }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;