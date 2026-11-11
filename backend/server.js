import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`[Server] Shubharambh Realty API running on port ${PORT}`);
  console.log(`[Server] Mode: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection]: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`[Uncaught Exception]: ${err.message}`);
  process.exit(1);
});

