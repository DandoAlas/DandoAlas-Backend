'use strict';
const mongoose = require('mongoose');

const pasajeroSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  nombres: String,
  apellidos: String,
  fechaNacimiento: String,
  cedula: Number
});

const Pasajero = mongoose.model('Pasajero', pasajeroSchema);

module.exports = Pasajero;