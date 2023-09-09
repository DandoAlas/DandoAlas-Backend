'use strict';
const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
  
    nombreApellido: String,
    correo: String,
    cedula: Number,
    telefono: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;