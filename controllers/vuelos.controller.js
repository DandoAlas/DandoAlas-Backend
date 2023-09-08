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
            vuelo.horaSalida = params.horaSalida;
            vuelo.precio = params.precio;
            vuelo.duracionVuelo = params.duracionVuelo;
            // vuelo.pasajeros.identificacion = params.identificacion;
            // vuelo.pasajeros.numeroAsiento = params.numeroAsiento;
            // vuelo.pasajeros.costo = params.costo;
            vuelo.costoMaletaAdicional = params.costoMaletaAdicional;
            vuelo.clase = params.clase;
            vuelo.numAsientos = params.numAsientos;
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
    },
    //obtener vuelo especifico, busqueda
    getVueloInfo: function (req, res) {
        var origen = req.query.origen;
        var destino = req.query.destino;
        var fechaSalida = req.query.fechaSalida;
        var query = {};
        if (origen) {
            query.origen = { $regex: origen, $options: 'i' };
        }
        if (destino) {
            query.destino = { $regex: destino, $options: 'i' };
        }
        if (fechaSalida) {
            query.fechaSalida = { $regex: fechaSalida, $options: 'i' };
        }
        Vuelo.find(query)
            .then(vuelos => {
                if (!vuelos || vuelos.length === 0) {
                    return res.status(404).send({ message: 'No se encontraron vuelos' });
                }
                return res.status(200).send({ vuelos });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al recuperar los datos' });
            });
    },

    // Obtener vuelo
    getVuelo: async function (req, res) {
        try {
            var vueloId = req.params.id;
            var vuelo = await Vuelo.findById(vueloId);

            if (!vuelo) {
                return res.status(404).send({ message: 'No se encontro el vuelo' });
            }
            return res.status(200).send({ vuelo });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener los datos' });
        }
    },

    // Actualizar vuelo
    updateVuelo: async function (req, res) {
        try {
            const vueloId = req.params.id;
            const update = req.body;

            // Primero, encontramos el vuelo usando findById
            let vuelo = await Vuelo.findById(vueloId);

            // Si no se encuentra el vuelo, retornamos un error
            if (!vuelo) {
                return res.status(404).send({ message: 'No se encontró el vuelo' });
            }

            // Luego, actualizamos las propiedades del vuelo con los valores de update
            Object.assign(vuelo, update);

            // Finalmente, guardamos el vuelo con los datos actualizados
            await vuelo.save();

            return res.status(200).send({ vuelo });
        } catch (err) {
            console.error("Error al actualizar el vuelo:", err);
            return res.status(500).send({ message: 'Error al actualizar los datos' });
        }
    },


    // Eliminar vuelo
    deleteVuelo: async function (req, res) {
        console.log("Intento de eliminar vuelo con ID:", req.params.id);

        try {
            var vueloId = req.params.id;

            // Intentamos encontrar el vuelo primero
            var vuelo = await Vuelo.findById(vueloId);

            if (!vuelo) {
                console.log("No se encontró el vuelo con ID:", vueloId);
                return res.status(404).send({ message: 'No se encontro el vuelo' });
            }

            console.log("Objeto vuelo encontrado:", vuelo);  // <-- Agregado para inspeccionar el objeto

            // Si el vuelo se encuentra, intentamos eliminarlo
            var resultado = await Vuelo.findByIdAndDelete(vueloId);

            if (!resultado) {
                console.log("No se pudo eliminar el vuelo con ID:", vueloId);
                return res.status(500).send({ message: 'No se pudo eliminar el vuelo' });
            }

            console.log("Vuelo eliminado con éxito:", vueloId);
            return res.status(200).send({ vuelo });
        } catch (err) {
            console.error("Error al eliminar el vuelo:", err);
            return res.status(500).send({ message: 'Error al eliminar los datos' });
        }
    },

    //ultimo vuelo
    getUltimoNumeroVuelo: async function (req, res) {
        try {
            const ultimoVuelo = await Vuelo.findOne({}, { numeroVuelo: 1 }).sort({ numeroVuelo: -1 });

            if (ultimoVuelo) {
                res.json(ultimoVuelo.numeroVuelo);
            } else {
                res.json(0); // Si no hay vuelos guardados, devuelve 0 o el número que consideres apropiado
            }
        } catch (error) {
            console.error('Error al obtener el último número de vuelo:', error);
            res.status(500).json({ mensaje: 'Error al obtener el último número de vuelo' });
        }
    },
    // Actuliazr vuelo
    actualizarVuelo: async (req, res) => {
        let vueloId = req.params.id;
        let update = req.body;

        try {
            const vueloActualizado = await Vuelo.findByIdAndUpdate(vueloId, update, { new: true });
            if (!vueloActualizado) {
                return res.status(404).send({ message: "No se pudo actualizar el vuelo" });
            }
            return res.status(200).send({ vuelo: vueloActualizado });
        } catch (err) {
            return res.status(500).send({ message: "Error al actualizar el vuelo", error: err });
        }
    }


}
module.exports = vueloController;