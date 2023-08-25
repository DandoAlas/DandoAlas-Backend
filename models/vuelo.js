'use strict';
const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  numeroVuelo: Number,
  nombreAerolinea: String,
  origen: String,
  destino: String,
  fechaSalida: String,
  horaSalida: String,
  precio: Number,
  duracionVuelo: String,
  pasajeros: [
    {
      // pasajero_id: mongoose.Schema.Types.ObjectId,
      identificacion: String,
      numeroAsiento: Number,
      costo: Number,
    }
  ],
  costoMaletaAdicional: Number,
  estado: String,
  disponibilidad: Boolean
});

const Vuelo = mongoose.model('Vuelo', vueloSchema);

module.exports = Vuelo;