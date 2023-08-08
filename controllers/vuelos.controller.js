'use strict'
const Vuelo = require('../models/vuelo');
var vueloController = {
    // Guardar vuelo
    saveVuelo: async function (req, res) {
        try {
            var vuelo = new Vuelo();
            var params = req.body;
            vuelo.numeroVuelo = params.numeroVuelo;
            vuelo.nombreAerolinea = params.nombreAerolinea;
            vuelo.origen = params.origen;
            vuelo.destino = params.destino;
            vuelo.fechaSalida = params.fechaSalida;
            vuelo.fechaLlegada = params.fechaLlegada;
            vuelo.horaSalida = params.horaSalida;
            vuelo.horaLlegada = params.horaLlegada;
            vuelo.duracionVuelo = params.duracionVuelo;
            vuelo.pasajeros.identificacion = params.identificacion;
            vuelo.pasajeros.numeroAsiento = params.numeroAsiento;
            vuelo.pasajeros.costo = params.costo;
            vuelo.costoMaletaAdicional = params.costoMaletaAdicional;
            vuelo.estado = params.estado;
            vuelo.disponibilidad = params.disponibilidad;
    
            var vueloStored = await vuelo.save();
    
            if (!vueloStored) {
                return res.status(404).send({ message: 'No se pudo guardar el vuelo' });
            }
            return res.status(201).send({ vuelo: vueloStored });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar los datos' });
        }
    },

    // Obtener vuelos
    getVuelos: async function (req, res) {
        try {
            var vuelos = await Vuelo.find({}).exec();
            return res.status(200).send({ vuelos });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener los datos' });
        }
    }
    
}
 module.exports = vueloController;