'use strict';
const express = require('express');
const router = express.Router();
const vueloController = require('../controllers/vuelos.controller');
const userController = require('../controllers/usuario.controller');

//======== VUELOS =========//

//guardar informacion del vuelo
router.post('/guardar-vuelo',vueloController.saveVuelo);

//obtener informacion de los vuelos
router.get('/obtener-vuelos',vueloController.getVuelos);

//obtener informacion del vuelo
router.get('/obtener-vuelo/:id?',vueloController.getVuelo);

//actualizar informacion del vuelo
router.put('/actualizar-vuelo/:id?',vueloController.updateVuelo);

//buscar vuelos
router.get('/buscar', vueloController.getVueloInfo);

//eliminar informacion del vuelo
router.delete('/eliminar-vuelo/:id?',vueloController.deleteVuelo);

//obtener el ultimo numero de vuelo
router.get('/ultimo-numero-vuelo', vueloController.getUltimoNumeroVuelo);

//*************USUARIOS**************** */

//guardar informacion del usuario
router.post('/guardar-usuario',userController.saveUsuario);

//obtener informacion de los usuarios
router.get('/obtener-usuarios',userController.getUsuarios);

//obtener informacion del usuario
router.get('/obtener-usuario/:id?',userController.getUsuario);

//Actualizar usuario
router.put('/actualizar-usuario/:id', userController.updateUsuario);

//Eliminar informacion de un usuario
router.delete('/eliminar-usuario/:id', userController.deleteUsuario);

module.exports = router;