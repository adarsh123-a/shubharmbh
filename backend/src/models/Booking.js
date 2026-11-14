import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    landId: {
      type: Number,
      required: [true, 'Land ID is required'],
    },
    siteName: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
    },
    plotId: {
      type: String,
      required: [true, 'Plot identifier is required'],
      trim: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomerLead',
      default: null,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      trim: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    tokenAmount: {
      type: Number,
      required: [true, 'Token amount is required'],
      min: [1, 'Token amount must be greater than 0'],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    paymentMode: {
      type: String,
      enum: ['Cash', 'Cheque', 'UPI', 'NEFT/RTGS'],
      default: 'UPI',
    },
    transactionRef: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending_rm', 'pending_admin', 'approved', 'rejected', 'registry_done'],
      default: 'pending_rm',
    },
    registryDate: {
      type: Date,
      default: null,
    },
    commissionPercentage: {
      type: Number,
      default: 5, // 5% default agent commission
    },
    commissionAmount: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

