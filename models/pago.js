'use strict';
const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  propietario: String,
  cuenta: String,
  banco: String
});

const Pago = mongoose.model('Pago', pagoSchema);

module.exports = Pago;
