import mongoose from 'mongoose';

const customerLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      trim: true,
      match: [/^[0-9]{10,14}$/, 'Please provide a valid phone number'],
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
    preferredLocation: {
      type: String,
      default: '',
    },
    interestedLand: {
      type: Number,
      default: null, // Land ID (e.g. 10)
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedRM: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'visit_scheduled', 'booked', 'lost'],
      default: 'new',
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

customerLeadSchema.index({ phone: 1, assignedAgent: 1 });

const CustomerLead = mongoose.model('CustomerLead', customerLeadSchema);
export default CustomerLead;

