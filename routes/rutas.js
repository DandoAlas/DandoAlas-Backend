'use strict'
var express= require('express');
var ConcesionarioController= require('../controllers/dandoAlas');
const userController = require('../controllers/usuario.controller');
var router=express.Router();


//Pagina de inicio
//*************VUELOS**************** */


router.get('/home',ConcesionarioController.home); //para poder conectarme por primera vez
//guardar informacion del vuelo
router.post('/guardar-vuelo',ConcesionarioController.saveVuelo);

/*
//obtener informacion de los vuelos
router.get('/obtener-vuelos', ConcesionarioController.getVuelos);

//obtener informacion de los vuelo
router.get('/obtener-vuelo/:id', ConcesionarioController.getVuelo);
*/

//*************USUARIOS**************** */
//guardar informacion del usuario
router.post('/guardar-usuario',userController.saveUsuario);

//Actualizar los usuarios
router.put('/actualizar-usuario/:id', userController.updateUsuario);

//obtener informacion de los usuarios
router.get('/obtener-usuarios',userController.getUsuarios);

//obtener informacion del usuario
router.get('/obtener-usuario/:id?',userController.getUsuario);

//Eliminar informacion de un usuario
router.delete('/eliminar-usuario/:id', userController.deleteUsuario);

module.exports = router;