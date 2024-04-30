import express from 'express';
import RegionController from '../controllers/regionController';

const regionRouter = express.Router();

regionRouter.post('/', RegionController.createRegion);
regionRouter.get('/', RegionController.listRegions);
regionRouter.get('/coordinates', RegionController.getRegionsByCoordinates);
regionRouter.get('/:id', RegionController.findRegionById);
regionRouter.put('/:id', RegionController.updateRegion);
regionRouter.delete('/:id', RegionController.deleteRegion);

export default regionRouter;