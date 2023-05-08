const express = require('express');
const { Checkout,paymentVerification,RozarPayKey } = require('../controllers/payController');
const router = express.Router();

router.post('/checkout', Checkout);
router.post('/paymentverification', paymentVerification);
router.get('/getkey', RozarPayKey);

module.exports = router;
