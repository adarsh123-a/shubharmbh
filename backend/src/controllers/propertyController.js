import mongoose from 'mongoose';
import Property from '../models/Property.js';

// GET /api/properties/home or /api/properties
export const getHomeProperties = async (req, res, next) => {
  try {
    const rawDocs = await mongoose.connection.db.collection('properties').find({}).toArray();

    let data = [];
    if (rawDocs.length > 0) {
      const docWithData = rawDocs.find((d) => Array.isArray(d.data));
      data = docWithData ? docWithData.data : rawDocs.filter((d) => d.side_name);
    }

    return res.status(200).json({
      status: true,
      status_code: 200,
      message: 'Success.',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/properties/:landId
export const getPropertyByLand = async (req, res, next) => {
  try {
    const rawDocs = await mongoose.connection.db.collection('properties').find({}).toArray();
    const docWithData = rawDocs.find((d) => Array.isArray(d.data));
    const all = docWithData ? docWithData.data : rawDocs;

    const property = all.find((p) => Number(p.land) === Number(req.params.landId));
    if (!property) {
      return res.status(404).json({
        status: false,
        message: 'Project not found.',
      });
    }
    return res.status(200).json({
      status: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/properties (Add new project)
export const createProperty = async (req, res, next) => {
  try {
    const { land, side_name, lat, lng, img, plots } = req.body;
    if (!land || !side_name) {
      return res.status(400).json({
        status: false,
        message: 'Land number and side_name are required.',
      });
    }

    const existing = await Property.findOne({ land: Number(land) });
    if (existing) {
      return res.status(400).json({
        status: false,
        message: `Project with land number ${land} already exists.`,
      });
    }

    const newProperty = await Property.create({
      land: Number(land),
      side_name,
      lat: lat || '26.4095280',
      lng: lng || '80.3894150',
      img: img || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
      plots: plots || [],
    });

    return res.status(201).json({
      status: true,
      message: 'Project created successfully.',
      data: newProperty,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/properties/:landId/plots/:plotId (Update plot status)
export const updatePlotStatus = async (req, res, next) => {
  try {
    const { landId, plotId } = req.params;
    const { status, booking_id } = req.body;

    const property = await Property.findOne({ land: Number(landId) });
    if (!property) {
      return res.status(404).json({ status: false, message: 'Project not found.' });
    }

    const plot = property.plots.find(
      (p) => String(p.id) === String(plotId) || p.plot_id === plotId
    );
    if (!plot) {
      return res.status(404).json({ status: false, message: 'Plot not found in this project.' });
    }

    if (status) plot.status = status;
    if (booking_id !== undefined) plot.booking_id = booking_id;

    await property.save();

    return res.status(200).json({
      status: true,
      message: 'Plot updated successfully.',
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

