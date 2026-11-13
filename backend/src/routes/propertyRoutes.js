import express from 'express';
import {
  getHomeProperties,
  getPropertyByLand,
  createProperty,
  updatePlotStatus,
} from '../controllers/propertyController.js';

const router = express.Router();

// Public routes for fetching property listings
router.get('/', getHomeProperties);
router.get('/home', getHomeProperties);
router.get('/:landId', getPropertyByLand);

// Management routes
router.post('/', createProperty);
router.patch('/:landId/plots/:plotId', updatePlotStatus);

export default router;

