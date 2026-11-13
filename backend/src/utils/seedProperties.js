import 'dotenv/config';
import mongoose from 'mongoose';
import Property from '../models/Property.js';

const SAMPLE_PROJECTS = [
  {
    land: 10,
    side_name: 'एयरपोर्ट चकेरी',
    status: 'true',
    lat: '26.4095280',
    lng: '80.3894150',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    plots: [
      {
        id: 1,
        land_id: 10,
        plot_id: 'L10-PLOT-001',
        price: '500000.00',
        area: '100.00',
        land_unit: 'गज',
        status: 'available',
        booking_id: null,
      },
      {
        id: 2,
        land_id: 10,
        plot_id: 'L10-PLOT-002',
        price: '650000.00',
        area: '130.00',
        land_unit: 'गज',
        status: 'available',
        booking_id: null,
      },
      {
        id: 3,
        land_id: 10,
        plot_id: 'L10-PLOT-003',
        price: '800000.00',
        area: '160.00',
        land_unit: 'गज',
        status: 'booked',
        booking_id: null,
      },
      {
        id: 4,
        land_id: 10,
        plot_id: 'L10-PLOT-004',
        price: '450000.00',
        area: '900.00',
        land_unit: 'वर्ग फुट',
        status: 'available',
        booking_id: null,
      },
      {
        id: 5,
        land_id: 10,
        plot_id: 'L10-PLOT-005',
        price: '700000.00',
        area: '1200.00',
        land_unit: 'वर्ग फुट',
        status: 'sold',
        booking_id: null,
      },
    ],
  },
  {
    land: 15,
    side_name: 'भीतर गाँव',
    status: 'true',
    lat: '26.4068170',
    lng: '80.3932090',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    plots: [
      {
        id: 6,
        land_id: 15,
        plot_id: 'L15-PLOT-001',
        price: '400000.00',
        area: '80.00',
        land_unit: 'गज',
        status: 'available',
        booking_id: null,
      },
      {
        id: 7,
        land_id: 15,
        plot_id: 'L15-PLOT-002',
        price: '550000.00',
        area: '110.00',
        land_unit: 'गज',
        status: 'available',
        booking_id: null,
      },
      {
        id: 8,
        land_id: 15,
        plot_id: 'L15-PLOT-003',
        price: '750000.00',
        area: '150.00',
        land_unit: 'गज',
        status: 'available',
        booking_id: null,
      },
      {
        id: 9,
        land_id: 15,
        plot_id: 'L15-PLOT-004',
        price: '600000.00',
        area: '1000.00',
        land_unit: 'वर्ग फुट',
        status: 'available',
        booking_id: null,
      },
      {
        id: 10,
        land_id: 15,
        plot_id: 'L15-PLOT-005',
        price: '900000.00',
        area: '1500.00',
        land_unit: 'वर्ग फुट',
        status: 'booked',
        booking_id: null,
      },
    ],
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('MONGO_URI is missing in .env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    for (const project of SAMPLE_PROJECTS) {
      await Property.findOneAndUpdate(
        { land: project.land },
        project,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Seeded Project: ${project.side_name} (Land: ${project.land})`);
    }

    console.log('Properties seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();

