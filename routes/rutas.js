'use strict'
var express= require('express');
var ConcesionarioController= require('../controllers/dandoAlas');
const userController = require('../controllers/usuario.controller');
var router=express.Router();


//pagina de inicio
router.get('/home',ConcesionarioController.home); //para poder conectarme por primera vez
//guardar informacion del vuelo
router.post('/guardar-vuelo',ConcesionarioController.saveVuelo);

//guardar informacion del usuario
router.post('/guardar-usuario',userController.saveUsuario);

//Actualizar los usuarios
router.put('/actualizar-usuario/:id', userController.updateUsuario);

//obtener informacion de los usuarios
router.get('/obtener-usuarios',userController.getUsuarios);

//obtener informacion del usuario
router.get('/obtener-usuario/:id?',userController.getUsuario);

module.exports = router;