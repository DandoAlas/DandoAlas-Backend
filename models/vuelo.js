'use strict';
const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
  numeroVuelo: Number,
  nombreAerolinea: String,
  origen: String,
  destino: String,
  fechaSalida: String,
  fechaRegreso: String,
  horaSalida: String,
  horaRegreso: String,
  duracionVuelo: String,
  numeroAsientos: Number,
  precio: Number,
  costoMaletaAdicional: Number,
  disponibilidad: Boolean
});

const Vuelo = mongoose.model('Vuelo', vueloSchema);

module.exports = Vuelo;