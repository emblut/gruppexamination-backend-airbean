import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  prodId: String,
  name: String,
  price: Number,
  qty: Number,
});

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    items: [orderItemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
