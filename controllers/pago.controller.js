'use strict'
const Pago = require('../models/pago');
const pagoController = {

    savePago: async function (req, res) {
        try {
            var pago = new Pago();
            var params = req.body;
            pago.propietario = params.propietario;
            pago.cuenta = params.cuenta;
            pago.banco = params.banco;
            var pagoStored = await pago.save();

            if (!pagoStored) {
                return res.status(404).send({ message: 'No se pudo guardar el pago' });
            }
            return res.status(201).send({ pago: pagoStored });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar los datos' });
        }
    },

}

module.exports = pagoController;