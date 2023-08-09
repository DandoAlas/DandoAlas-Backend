'use strict'
const express = require('express');
const vueloController = require('../controllers/vuelos.controller');
const userController = require('../controllers/usuario.controller');
const router = express.Router();

//guardar informacion del vuelo
router.post('/guardar-vuelo',vueloController.saveVuelo);

//obtener informacion de los vuelos
router.get('/obtener-vuelos',vueloController.getVuelos);

//obtener informacion del vuelo
router.get('/obtener-vuelo/:id?',vueloController.getVuelo);

//actualizar informacion del vuelo
router.put('/actualizar-vuelo/:id?',vueloController.updateVuelo);

//eliminar informacion del vuelo
router.delete('/eliminar-vuelo/:id?',vueloController.deleteVuelo);

//guardar informacion del usuario
router.post('/guardar-usuario',userController.saveUsuario);

//obtener informacion de los usuarios
router.get('/obtener-usuarios',userController.getUsuarios);

//obtener informacion del usuario
router.get('/obtener-usuario/:id?',userController.getUsuario);

module.exports = router;