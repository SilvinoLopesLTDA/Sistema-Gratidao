const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "Nenhuma descrição informada",
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
