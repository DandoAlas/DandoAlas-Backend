
'use strict'
const mongoose = require('mongoose');
const port = '3600';
const app = require('./app')

mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/Areopuerto')
    .then(() => {
        console.log("Conexion a BDD");
        app.listen(port, () => {
            console.log("Conexion establecida en el url:localhost:3600 o 127.0.0.1:3600");
        })
    })
    .catch(err => console.log(err));
    
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected by app termination`);
        process.exit(0);
    });
});
