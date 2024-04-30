import GeoLib from '../lib/index';
import { RegionModel } from '../models/regionModel';
import { UserModel } from '../models/user';

interface IRegion {
    name: string;
    coordinates: [number, number];
    userId: string;
}

class RegionService {
    async createRegion({ coordinates, name, userId }: IRegion) {
        await UserModel.findOne({ _id: userId }).lean();
        await GeoLib.getAddressFromCoordinates(coordinates)

        const newRegion = new RegionModel({
            name,
            coordinates,
            userId
        });

        return newRegion

    }
}

export default new RegionService