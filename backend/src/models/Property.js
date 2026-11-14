import mongoose from 'mongoose';

const plotSchema = new mongoose.Schema(
  {
    id: { type: Number },
    land_id: { type: Number },
    plot_id: { type: String, required: true },
    price: { type: String, required: true },
    area: { type: String, required: true },
    land_unit: { type: String, default: 'गज' },
    status: {
      type: String,
      enum: ['available', 'booked', 'sold'],
      default: 'available',
    },
    booking_id: { type: String, default: null },
  },
  { _id: true, timestamps: true }
);

const propertySchema = new mongoose.Schema(
  {
    land: {
      type: Number,
      required: [true, 'Land ID is required'],
      unique: true,
    },
    side_name: {
      type: String,
      required: [true, 'Project/Site name is required'],
      trim: true,
    },
    location: {
      type: String,
      default: 'कानपुर / लखनऊ, उत्तर प्रदेश',
    },
    price: {
      type: String,
      default: '₹ 4,500 / गज Onwards',
    },
    status: {
      type: String,
      default: 'true',
    },
    lat: {
      type: String,
      default: '26.4095280',
    },
    lng: {
      type: String,
      default: '80.3894150',
    },
    img: {
      type: String,
      default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    },
    plots: [plotSchema],
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);
export default Property;

