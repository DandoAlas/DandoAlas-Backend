'use strict'
var express= require('express');
var ConcesionarioController= require('../controllers/dandoAlas');
var router=express.Router();


//pagina de inicio
router.get('/home',ConcesionarioController.home); //para poder conectarme por primera vez
//guardar informacion del vuelo
router.post('/guardar-vuelo',ConcesionarioController.saveVuelo);

module.exports = router;