'use strict'
const Pasajero = require('../models/pasajero');
var pasajeroController = {
    // Guardar pasajero
    savePasajero: async function (req, res) {
        try {
            var pasajero = new Pasajero();
            var params = req.body;
            pasajero.nombres = params.nombres;
            pasajero.apellidos = params.apellidos;
            pasajero.fechaNacimiento = params.fechaNacimiento;
            pasajero.cedula = params.cedula;

            var pasajeroStored = await pasajero.save();
            if (!pasajeroStored) {
                return res.status(404).send({ message: 'No se pudo guardar el pasajero' });
            }
            return res.status(201).send({ pasajero: pasajeroStored });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar los datos' });
        }
    },
    // Obtener pasajeros
    getPasajeros: async function (req, res) {
        try {
            var pasajeros = await Pasajero.find({}).exec();
            return res.status(200).send({ pasajeros });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener los datos' });
        }
    },
    // Obtener pasajero
    getPasajero: async function (req, res) {
        try {
            var pasajeroId = req.params.id;
            var pasajero = await Pasajero.findById(pasajeroId);

            if (!pasajero) {
                return res.status(404).send({ message: 'No se encontro el pasajero' });
            }
            return res.status(200).send({pasajero });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener los datos' });
        }
    },

    // Actualizar pasajero
    updatePasajero: async function (req, res) {
        try {
            var pasajeroId = req.params.id;
            var update = req.body;
            var pasajero = await Pasajero.findByIdAndUpdate(pasajeroId, update, { new: true });

            if (!pasajero) {
                return res.status(404).send({ message: 'No se encontro el pasajero' });
            }
            return res.status(200).send({ pasajero });
        } catch (err) {
            return res.status(500).send({ message: 'Error al actualizar los datos' });
        }
    },

    // Eliminar pasajero
    deletePasajero: async function (req, res) {
        try {
            var pasajeroId = req.params.id;
            var pasajero = await Pasajero.findByIdAndDelete(pasajeroId);

            if (!pasajero) {
                return res.status(404).send({ message: 'No se encontro el pasajero' });
            }
            return res.status(200).send({ pasajero });
        } catch (err) {
            return res.status(500).send({ message: 'Error al eliminar los datos' });
        }
    }
}
module.exports = pasajeroController;