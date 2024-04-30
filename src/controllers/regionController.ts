import { Request, Response } from 'express';
import { RegionModel } from '../models/regionModel';
import regionService from '../services/regionService';
import { STATUS } from '../utils/httpStatus';

class RegionController {
    async createRegion(req: Request, res: Response) {
        try {
            const { name, coordinates, userId } = req.body;
            const newRegion = await regionService.createRegion({ name, coordinates, userId })

            await newRegion.save();

            res.status(201).json(newRegion);
        } catch (error: any) {
            console.error('Error creating region:', error);
            res.status(500).json({ error: 'Error creating region' });
        }
    }

    async listRegions(req: Request, res: Response) {
        const { page, limit } = req.query;

        try {
            const [regions, total] = await Promise.all([
                RegionModel.find().lean(),
                RegionModel.countDocuments(),
            ]);

            res.json({
                rows: regions,
                page,
                limit,
                total,
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching regions' });
        }
    }

    async findRegionById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const region = await RegionModel.findOne({ _id: id }).lean();

            if (!region) {
                return res.status(STATUS.NOT_FOUND).json({ message: 'region not found' });
            }

            res.json(region);
        } catch (error) {
            console.error('Error fetching region:', error);
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching region' });
        }
    }

    async updateRegion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, coordinates, userId } = req.body;

            if (!userId) {
                return res.status(STATUS.BAD_REQUEST).json({ message: 'User not found' });
            }

            const updatedRegion = await RegionModel.findByIdAndUpdate(id, {
                name,
                coordinates
            }, { new: true });

            if (!updatedRegion) {
                return res.status(404).json({ message: 'Region not found' });
            }

            res.json(updatedRegion);
        } catch (error: any) {
            console.error('Error updating region:', error);
            res.status(500).json({ error: 'Error updating region' });
        }
    }

    async deleteRegion(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const region = await RegionModel.findByIdAndDelete(id);

            if (!region) {
                return res.status(404).json({ message: 'Region not found' });
            }

            res.json(region);
        } catch (error: any) {
            console.error('Error deleting region:', error);
            res.status(500).json({ error: 'Error deleting region' });
        }
    }

    async getRegionsByCoordinates(req: Request, res: Response) {
        const { lat, long } = req.body;

        try {
            if (!lat || !long) {
                return res.status(STATUS.BAD_REQUEST).json({ message: 'Latitude and longitude are required' });
            }

            const coordinates = [parseFloat(long as string), parseFloat(lat as string)];

            console.log("coordinates ===>>", coordinates)

            const regions = await RegionModel.find({
                coordinates: {
                    $eq: coordinates
                }
            }).lean();

            res.json(regions);
        } catch (error) {
            console.error('Error fetching regions by coordinates:', error);
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching regions by coordinates' });
        }
    }
}

export default new RegionController();