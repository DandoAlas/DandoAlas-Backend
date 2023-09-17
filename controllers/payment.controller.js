const axios = require('axios');
const transporter = require('../mail/mailer')
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const PAYPAL_API_CLIENT = 'AQpHDVdKE3lryT5PDUkrhFvyaGPSxBk4yxaNqo9nmaYon-AXFaORqo8-bqtWANJg_3ToMPFhkU-4rDIu';
const PAYPAL_API_SECRET = 'EEMecI2eDx6K1qWcJi0zgAmcOYf9kiz40WQzgRAdDFrQU-toiIMz1L9pWxrXl_onLlJkaf3omq7nDdGx';

const paymentController = {
    createOrder: async (req, res) => {
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: req.body.value
                    }
                },
            ],
            application_context: {
                brand_name: `Dando Alas`,
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: 'http://localhost:3600/capture-order',
                cancel_url: 'http://localhost:3600/cancel-order'
            }

        }
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        return res.json(response.data);
    },

    captureOrder: async (req, res) => {
        const { token } = req.query;

        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })

        res.send('<script>window.close();</script>');
        res.status(200);
    },

    sendEmail: async (req, res) => {
        const {
            name,
            cedula,
            email,
            value,
            origen,
            destino,
            fechaSalida,
            horaSalida,
            duracionVuelo,
            nombreAerolinea,
            clase,
            cantidadPasajeros,
        } = req.body;
        try {
            await transporter.sendMail({
                from: 'Dando Alas <ricardo.teran1816@gmail.com>',
                to: email,
                subject: 'Compra de boleto',
                text: `Hola ${name} con identificación ${cedula}, gracias por tu compra. El total de tu compra es ${value}`,
                html: `
                    <h1>Voleto Comprado</h1>
                    <img src="https://i.imgur.com/f9Tseq1.jpg" alt="logo" style="width: 200px;">
                    <br>
                    <b>Hola ${name} con identificación ${cedula}</b>,<br>¡Gracias por tu compra!.
                    <br>Aquí está tu resumen:<br>
                    <div>${origen}, ${destino}-Ecuador</div><br>
                    <div>Salida: ${fechaSalida} a las ${horaSalida}:00h</div><br>
                    <div>Duración del viaje: ${duracionVuelo} minutos</div><br>
                    <div>Operado por: ${nombreAerolinea}</div><br>
                    <div>Costo total: ${value} dólares</div><br>
                    <div>Clase: ${clase}</div><br>
                    <div>Pasajeros: ${cantidadPasajeros}</div><br>
                `,
            });
            return res.status(200).send('Email sent');
        } catch (error) {
            console.log(error);
        }
    },

    cancelOrder: async (req, res) => {
        res.json('cancel order');
    }
}

module.exports = paymentController;