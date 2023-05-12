const express = require('express');
const { Checkout,paymentVerification,RozarPayKey, MerchantId, GoogleTransaction } = require('../controllers/payController');
const router = express.Router();

//Razorpay
router.post('/checkout', Checkout);
router.post('/paymentverification', paymentVerification);
router.get('/getkey', RozarPayKey);


//Googlepay
router.get('/getmerchantid', MerchantId);
router.post('/googletransaction', GoogleTransaction);

module.exports = router;
