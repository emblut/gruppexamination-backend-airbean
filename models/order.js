import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  prodId: String,
  title: String,
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
      unique: true,
    },
    items: [orderItemSchema],
    totalPrice: Number,
    orderTime: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
