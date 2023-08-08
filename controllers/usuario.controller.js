'use strict'
const Usuario = require('../models/usuario');
const userController = {

    // Guardar usuario
    saveUsuario: async function (req, res) {
        try {
            var usuario = new Usuario();
            var params = req.body;
            usuario.nombre = params.nombre;
            usuario.apellido = params.apellido;
            usuario.nacimiento = params.nacimiento;
            usuario.correo = params.correo;
            usuario.identificacion = params.identificacion;
            usuario.telefono = params.telefono;

            //Probando

            var usuarioStored = await usuario.save();

            if (!usuarioStored) {
                return res.status(404).send({ message: 'No se pudo guardar el usuario' });
            }
            return res.status(201).send({ usuario: usuarioStored });
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar los datos' });
        }
    },

    //Obtener usuarios
    getUsuarios: async function (req, res) {
        try {
            var usuarios = await Usuario.find().sort('_id').exec();
            if (usuarios.length == 0) {
                return res.status(404).send({ message: 'No se encontraron usuarios' });
            }
            return res.status(200).send({ usuarios });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener los datos' });
        }
    },

    // Obtener usuario
    getUsuario: async function (req, res) {
        try {
            var usuarioId = req.params.id;
            var usuario = await Usuario.findById(usuarioId);

            if (!usuario) {
                return res.status(404).send({ message: 'No se encontro el usuario' });
            }
            return res.status(200).send({ usuario });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener los datos' });
        }
    },
    
    //Actualizar usuarios
    updateUsuario: async function (req, res) {
        try {
            var usuarioId = req.params.id;
            var update = req.body;
            var usuario = await Usuario.findByIdAndUpdate(usuarioId, update, {new: true}); // {new: true} retorna el objeto actualizado
    
            if (!usuario) {
                return res.status(404).send({ message: 'No se encontró el usuario para actualizar' });
            }
            return res.status(200).send({ usuario });
        } catch (err) {
            return res.status(500).send({ message: 'Error al actualizar los datos' });
        }
    }
    
}

    

module.exports = userController;