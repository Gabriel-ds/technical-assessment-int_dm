import lib from '../lib';
import { UserModel } from '../models/user';

class UserService {
    async resolveCoordinatesAndAddress(address: string, coordinates: number[]) {
        if ((address && coordinates) || (!address && !coordinates)) {
            return { error: 'Please provide either address or coordinates' };
        }
        let userCoordinates: number[] | undefined = coordinates
        let userAddress: string | undefined = address


        if (address) {
            userCoordinates = await lib.getCoordinatesFromAddress(address);
        } else if (coordinates) {
            userAddress = await lib.getAddressFromCoordinates(coordinates)
        }

        return { userCoordinates, userAddress };
    };

    async validUserId(id: string) {
        const user = await UserModel.findOne({ _id: id }).lean();
        if (!user) {
            return user
        }
    }
}

export default new UserService