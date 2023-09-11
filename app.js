'use strict'
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
var concesionario_routes = require('./routes/rutas');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // Algunos navegadores antiguos (IE11, varios navegadores móviles) no admiten status 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //forzando

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Request-With,Content-Type,Accept, Access-Control-Allow,Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
})

app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Pagina Funcionando</h1>"
    );
});

app.use('/', concesionario_routes);
module.exports = app; //para exportar archivos 
