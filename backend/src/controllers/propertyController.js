import mongoose from 'mongoose';
import Property from '../models/Property.js';

// GET /api/properties/home or /api/properties
export const getHomeProperties = async (req, res, next) => {
  try {
    const rawDocs = await mongoose.connection.db.collection('properties').find({}).toArray();

    let data = [];
    if (rawDocs && rawDocs.length > 0) {
      const map = new Map();

      // 1. Ingest from any legacy nested document with { data: [...] }
      rawDocs.forEach((d) => {
        if (Array.isArray(d.data)) {
          d.data.forEach((item) => {
            if (item && (item.land !== undefined || item.side_name)) {
              map.set(String(item.land || item.side_name), item);
            }
          });
        }
      });

      // 2. Ingest all individual property documents (including newly created ones by Super-Admin / Admin)
      rawDocs.forEach((d) => {
        if (!Array.isArray(d.data) && (d.side_name || d.land !== undefined)) {
          map.set(String(d.land || d.side_name), d);
        }
      });

      data = Array.from(map.values());
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
    const targetLand = Number(req.params.landId);
    const rawDocs = await mongoose.connection.db.collection('properties').find({}).toArray();

    let found = null;

    // Check individual docs first
    found = rawDocs.find((d) => !Array.isArray(d.data) && Number(d.land) === targetLand);

    // Check nested array if not found
    if (!found) {
      for (const d of rawDocs) {
        if (Array.isArray(d.data)) {
          const item = d.data.find((p) => Number(p.land) === targetLand);
          if (item) {
            found = item;
            break;
          }
        }
      }
    }

    if (!found) {
      return res.status(404).json({
        status: false,
        message: 'Project not found.',
      });
    }
    return res.status(200).json({
      status: true,
      data: found,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/properties (Add new project)
export const createProperty = async (req, res, next) => {
  try {
    const { land, side_name, lat, lng, img, plots, location, price } = req.body;
    if (!land || !side_name) {
      return res.status(400).json({
        status: false,
        message: 'Land number and side_name are required.',
      });
    }

    const landNum = Number(land);

    // Check in Mongoose collection
    const existing = await Property.findOne({ land: landNum });
    if (existing) {
      return res.status(400).json({
        status: false,
        message: `Project with land number ${land} already exists.`,
      });
    }

    // Auto-generate plots if empty so customer & agent portals have ready plots to sell
    let finalPlots = plots;
    if (!Array.isArray(finalPlots) || finalPlots.length === 0) {
      finalPlots = [];
      const baseRate = parseInt(String(price || '').replace(/[^0-9]/g, ''), 10) || 4500;
      const plotConfigs = [
        { area: 100, unit: 'गज' },
        { area: 120, unit: 'गज' },
        { area: 150, unit: 'गज' },
        { area: 180, unit: 'गज' },
        { area: 200, unit: 'गज' },
        { area: 250, unit: 'गज' },
        { area: 900, unit: 'वर्ग फुट' },
        { area: 1200, unit: 'वर्ग फुट' },
      ];

      for (let i = 1; i <= 20; i++) {
        const cfg = plotConfigs[(i - 1) % plotConfigs.length];
        const plotPrice = String(cfg.area * baseRate);
        finalPlots.push({
          id: i,
          land_id: landNum,
          plot_id: `L${landNum}-PLOT-${String(i).padStart(3, '0')}`,
          price: plotPrice,
          area: String(cfg.area),
          land_unit: cfg.unit,
          status: 'available',
          booking_id: null,
        });
      }
    }

    const propertyPayload = {
      land: landNum,
      side_name: side_name.trim(),
      location: location ? location.trim() : 'कानपुर / लखनऊ, उत्तर प्रदेश',
      price: price ? price.trim() : '₹ 4,500 / गज Onwards',
      lat: lat ? String(lat).trim() : '26.4095280',
      lng: lng ? String(lng).trim() : '80.3894150',
      img: img || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
      plots: finalPlots,
    };

    const newProperty = await Property.create(propertyPayload);

    // Also update any legacy { data: [...] } document in properties collection if present
    try {
      const docWithData = await mongoose.connection.db.collection('properties').findOne({ data: { $type: 'array' } });
      if (docWithData) {
        await mongoose.connection.db.collection('properties').updateOne(
          { _id: docWithData._id },
          { $push: { data: propertyPayload } }
        );
      }
    } catch (e) {
      console.warn('Legacy sync notice:', e.message);
    }

    return res.status(201).json({
      status: true,
      message: 'Project created successfully with available plots.',
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

/**
 * PUT /api/properties/:landId
 * Super-Admin updates land scheme details
 */
export const updateProperty = async (req, res, next) => {
  try {
    const { landId } = req.params;
    const { side_name, location, price, lat, lng, status, plots } = req.body;
    const landNum = Number(landId);

    const property = await Property.findOne({ land: landNum });
    if (!property) {
      return res.status(404).json({
        status: false,
        message: `Project with land number ${landId} not found.`,
      });
    }

    if (side_name !== undefined) property.side_name = side_name.trim();
    if (location !== undefined) property.location = location.trim();
    if (price !== undefined) property.price = price.trim();
    if (lat !== undefined) property.lat = String(lat).trim();
    if (lng !== undefined) property.lng = String(lng).trim();
    if (status !== undefined) property.status = status;
    if (plots !== undefined && Array.isArray(plots)) property.plots = plots;

    await property.save();

    // Also update any legacy { data: [...] } document in properties collection if present
    try {
      const docWithData = await mongoose.connection.db.collection('properties').findOne({ data: { $type: 'array' } });
      if (docWithData) {
        await mongoose.connection.db.collection('properties').updateOne(
          { _id: docWithData._id, 'data.land': landNum },
          {
            $set: {
              'data.$.side_name': property.side_name,
              'data.$.location': property.location,
              'data.$.price': property.price,
              'data.$.lat': property.lat,
              'data.$.lng': property.lng,
              'data.$.status': property.status,
            },
          }
        );
      }
    } catch (e) {
      console.warn('Legacy sync update notice:', e.message);
    }

    return res.status(200).json({
      status: true,
      message: 'Land project updated successfully.',
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/properties/:landId
 * Super-Admin deletes land scheme completely
 */
export const deleteProperty = async (req, res, next) => {
  try {
    const { landId } = req.params;
    const landNum = Number(landId);

    const deleted = await Property.findOneAndDelete({ land: landNum });

    // Also remove from any legacy { data: [...] } document if present
    try {
      await mongoose.connection.db.collection('properties').updateOne(
        { data: { $type: 'array' } },
        { $pull: { data: { land: landNum } } }
      );
    } catch (e) {
      console.warn('Legacy sync delete notice:', e.message);
    }

    return res.status(200).json({
      status: true,
      message: `Land project #${landId} deleted successfully.`,
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

