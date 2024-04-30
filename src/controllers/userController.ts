import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import UserService from '../services/userService';
import { STATUS } from '../utils/httpStatus';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, address, coordinates } = req.body;
            const result = await UserService.resolveCoordinatesAndAddress(address, coordinates);
            if (result.error) {
                return res.status(STATUS.BAD_REQUEST).json({ error: result.error });
            }
            const { userCoordinates, userAddress } = result;

            const newUser = new UserModel({
                name,
                email,
                address: userAddress,
                coordinates: userCoordinates,
                regions: []
            });
            await newUser.save();
            res.send(newUser)
        } catch (error: any) {
            console.log(error)
            res.status(500).send({ message: error.message });
        }
    }

    async getUsers(req: Request, res: Response) {
        const { page, limit } = req.query;

        try {
            const [users, total] = await Promise.all([
                UserModel.find().lean(),
                UserModel.countDocuments(),
            ]);

            res.json({
                rows: users,
                page,
                limit,
                total,
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching users' });
        }
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await UserModel.findOne({ _id: id }).lean();

            if (!user) {
                return res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching user' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, address, coordinates } = req.body;

            const result = await UserService.resolveCoordinatesAndAddress(address, coordinates);
            if (result.error) {
                return res.status(STATUS.BAD_REQUEST).json({ error: result.error });
            }
            const { userCoordinates, userAddress } = result;

            const user = await UserModel.findOneAndUpdate(
                { _id: id },
                { name, email, address: userAddress, coordinates: userCoordinates },
                { new: true }
            );

            if (!user) {
                return res.status(STATUS.NOT_FOUND).json({ message: 'User not found' });
            }

            res.status(STATUS.UPDATED).json(user);
        } catch (error: any) {
            console.error('Error updating user:', error);
            res.status(500).send({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await UserModel.findByIdAndDelete(id)
            if (!user) return res.status(STATUS.NOT_FOUND).send({ message: "User not found" })
            res.send(user)
        } catch (error) {
            res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user' })
        }
    }
}

export default new UserController();