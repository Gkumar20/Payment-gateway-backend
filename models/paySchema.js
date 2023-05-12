const mongoose = require('mongoose')
                                  
const paymentSchema = new mongoose.Schema({
  order_id: {
    type: String,
  },
  transaction_id: {
    type: String,
  }
});

module.exports = mongoose.model("Payment", paymentSchema);