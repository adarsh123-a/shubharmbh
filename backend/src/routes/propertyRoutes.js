import express from 'express';
import {
  getHomeProperties,
  getPropertyByLand,
  createProperty,
  updateProperty,
  deleteProperty,
  updatePlotStatus,
} from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes for fetching property listings
router.get('/', getHomeProperties);
router.get('/home', getHomeProperties);
router.get('/:landId', getPropertyByLand);

// Management routes
router.post('/', createProperty);
router.put('/:landId', protect, authorizeRoles('super_admin'), updateProperty);
router.delete('/:landId', protect, authorizeRoles('super_admin'), deleteProperty);
router.patch('/:landId/plots/:plotId', updatePlotStatus);

export default router;
