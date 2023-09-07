'use strict';
const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
  numeroVuelo: Number,
  nombreAerolinea: String,
  origen: String,
  destino: String,
  fechaSalida: String,
  horaSalida: String,
  precio: Number,
  duracionVuelo: String,
  pasajeros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pasajero' }],
  costoMaletaAdicional: Number,
  clase: String,
  numAsientos: Number,
  estado: String,
  disponibilidad: Boolean
});


const Vuelo = mongoose.model('Vuelo', vueloSchema);

module.exports = Vuelo;