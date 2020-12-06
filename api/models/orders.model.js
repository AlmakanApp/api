const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const Order = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  p_id: {
    type: Schema.Types.ObjectId,
  },
  c_id: {
    type: Schema.Types.ObjectId,
  },
  c_name:{
    type:String
  },
  mobile:{
    type:String
  },
  address:{
    type:String
  },
  floor: {
    type: String,
  },
  flat: {
    type: String,
  },
  totalPayment: {
    type: String,
  },
  downPayment: {
    type: String,
  },
  totalInstallments: {
    type: String,
  },
  installmentsPaid: {
    type: String,
  },
  installmentPrice: {
    type: String,
  },
  status: {
    type: String,
  },
  entry_date: {
    type: Date,
  },
});

Order.plugin(mongoosePaginate);

module.exports = mongoose.model("Orders", Order);

// Before
// const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');
// const Schema = mongoose.Schema;

// const Product = new Schema({
//     name: {
//         type: String
//     },
//     size: {
//         type: String
//     },
//     quantity: {
//         type: String,
//         unique: true,
//         sparse: true
//     },
//     category: {
//         type: String
//     },
//     address: {
//         type: String
//     },
//     // image: {
//     //     data: Buffer,
//     //     contentType: String
//     // },
//     is_deleted: {
//         type: Boolean,
//         default: false
//     }
// });

// Product.plugin(mongoosePaginate);

// module.exports = mongoose.model("Product", Product);
