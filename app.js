'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
var concesionario_routes = require('./routes/rutas');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // Algunos navegadores antiguos (IE11, varios navegadores móviles) no admiten status 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //forzando

app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Pagina Funcionando</h1>"
    );
});

app.use('/', concesionario_routes);
module.exports = app; //para exportar archivos 
