const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Payment = require('../models/paySchema')


const rzp = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

//rezorpay checkout
exports.Checkout = async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${crypto.randomBytes(10).toString('hex')}`,
        payment_capture: 1
    };

    try {
        const order = await rzp.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to create order' });
    }
};

//razorpay verifications
exports.paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;


        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest('hex');


        const isAuthentic = expectedSignature === razorpay_signature
        if (isAuthentic) {
            //data base saved

            await Payment.create({
                order_id: razorpay_order_id,
                transaction_id: razorpay_payment_id,
            })

            res.redirect(`http://localhost:3000/paymentsuccess/${razorpay_order_id}`)

        } else {
            res.status(400).json({
                success: false,
            })

        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to verify' });
    }
};

// get razorpay key 
exports.RozarPayKey = async (req, res) => {
    try {
        res.status(200).json({
            key: process.env.RAZORPAY_API_KEY
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to verify' });
    }
};


//get google pay merchant id
exports.MerchantId = async (req, res) => {
    try {
        res.status(200).json({
            mid: process.env.Merchant_ID
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to verify' });
    }
};


//Googlepay Post Transaction id and redirect

exports.GoogleTransaction = async (req, res) => {
    const { OrderId, TransactionId } = req.body
    try {
        await Payment.create({
            order_id: OrderId,
            transaction_id: TransactionId,
        })
        res.status(200).send({message:"success"})
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'unable to payment' });
    }

}
