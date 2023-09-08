'use strict';
const express = require('express');
const router = express.Router();
const vueloController = require('../controllers/vuelos.controller');
const userController = require('../controllers/usuario.controller');
const authController = require('../auth/auth.controller');
const pasajeroController = require('../controllers/pasajeros.controller');
const pagoController = require('../controllers/pago.controller');

//======== LOGIN =========//
//registrar usuario
router.post('/register', authController.createUser);

//login
router.post('/login', authController.loginUser);

//======== VUELOS =========//

//guardar informacion del vuelo
router.post('/guardar-vuelo', vueloController.saveVuelo);

//obtener informacion de los vuelos
router.get('/obtener-vuelos', vueloController.getVuelos);

//obtener informacion del vuelo
router.get('/obtener-vuelo/:id?', vueloController.getVuelo);

//actualizar informacion del vuelo
router.put('/actualizar-vuelo/:id?', vueloController.updateVuelo);

//buscar vuelos
router.get('/buscar', vueloController.getVueloInfo);

//eliminar informacion del vuelo
router.delete('/eliminar-vuelo/:id?',vueloController.deleteVuelo);

//obtener el ultimo numero de vuelo
router.get('/ultimo-numero-vuelo', vueloController.getUltimoNumeroVuelo);

//Editar vuelos 
router.put('/vuelo/:id', vueloController.actualizarVuelo);


//======== USUARIOS =========//

//guardar informacion del usuario
router.post('/guardar-usuario', userController.saveUsuario);

//obtener informacion de los usuarios
router.get('/obtener-usuarios', userController.getUsuarios);

//obtener informacion del usuario
router.get('/obtener-usuario/:id?', userController.getUsuario);

//Actualizar usuario
router.put('/actualizar-usuario/:id', userController.updateUsuario);

//Eliminar informacion de un usuario
router.delete('/eliminar-usuario/:id', userController.deleteUsuario);

//======== PASAJEROS =========//

//guardar informacion del pasajero
router.post('/guardar-pasajero', pasajeroController.savePasajero);

//obtener informacion de los pasajeros
router.get('/obtener-pasajeros', pasajeroController.getPasajeros);

//obtener informacion del pasajero
router.get('/obtener-pasajero/:id?', pasajeroController.getPasajero);

//actualizar informacion del pasajero
router.put('/actualizar-pasajero/:id?', pasajeroController.updatePasajero);

//eliminar informacion del pasajero
router.delete('/eliminar-pasajero/:id?',pasajeroController.deletePasajero);


router.post('/guardar-pago', pagoController.savePago);

module.exports = router;