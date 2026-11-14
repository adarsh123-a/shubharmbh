import mongoose from 'mongoose';

const siteVisitSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomerLead',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    landId: {
      type: Number,
      required: [true, 'Land ID is required'],
    },
    siteName: {
      type: String,
      required: [true, 'Site / Project name is required'],
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
    visitDate: {
      type: Date,
      required: [true, 'Visit date is required'],
    },
    pickupAddress: {
      type: String,
      required: [true, 'Pickup address for cab is required'],
      trim: true,
    },
    cabRequired: {
      type: Boolean,
      default: true,
    },
    driverName: {
      type: String,
      default: '',
    },
    driverPhone: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    remarks: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const SiteVisit = mongoose.model('SiteVisit', siteVisitSchema);
export default SiteVisit;

