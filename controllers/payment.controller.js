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
        // return res.send('payed');
        return res.send('<script>window.close();</script>');
        
    },

    cancelOrder: async (req, res) => {
        res.json('cancel order');
    }
}

module.exports = paymentController;