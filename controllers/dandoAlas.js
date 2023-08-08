'use strict'
var Vuelo = require("../models/vuelo");
var fs = require('fs');
var path = require('path');
var controller = {
    home: function (req, res) {
        return res.status(200).send(
            "<h1>Hola mundo desde el controlador</h1>"
        );
    },
    save:function(req, res) {
        return res.status(200).send(
            "<h1>Hola mundo desde el controlador</h1>"
        );
    },
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
            vuelo.fechaRegreso = params.fechaRegreso;
            vuelo.horaSalida = params.horaSalida;
            vuelo.horaRegreso = params.horaRegreso;
            vuelo.duracionVuelo = params.duracionVuelo;
            vuelo.numeroAsientos = params.numeroAsientos;
            vuelo.precio = params.precio;
            vuelo.costoMaletaAdicional = params.costoMaletaAdicional;
            vuelo.disponibilidad = params.disponibilidad;
    
            var vueloStored = await vuelo.save();
    
            if (!vueloStored) {
                return res.status(404).send({ message: 'No se pudo guardar el vuelo' });
            }
            return res.status(201).send({ vuelo: vueloStored });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar los datos' });
        }
    }
    
}
 module.exports = controller;