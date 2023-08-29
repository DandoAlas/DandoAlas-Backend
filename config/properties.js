const mongoose = require('mongoose');
const dbURL = ('./properties').DB;


module.exports -= () => {
    mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => {
        console.log(`Mongoose connected to ${dbURL}`);
    })
    .catch(err => { console.log(`MongoDB connection error: ${err}`) });

    process.on('SIGINT', () => { 
        mongoose.connection.close(() => {
            console.log(`Mongoose disconnected by app termination`);
            process.exit(0);
        });
    });
}