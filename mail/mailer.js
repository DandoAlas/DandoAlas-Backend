const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ricardo.teran1816@gmail.com',
        // pass: 'zgqr scpb qbct gbft'
        pass: 'ypir hvql erjv xgrp'
    }
});

transporter.verify().then( () => {
    console.log('Ready for send emails');
})

module.exports = transporter;