import mongoose, { Document, Model, Schema, model } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    address: string;
    coordinates: [number, number];
    regions: string[]; // Array de IDs de regiões
}

interface IRegion extends Document {
    _id: string;
    name: string;
    user: string; // ID do usuário
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    _id: { type: String, required: true, default: () => new ObjectId().toString() },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    regions: [{ type: Schema.Types.ObjectId, ref: 'Region' }]
});

// const RegionSchema: Schema<IRegion> = new Schema<IRegion>({
//     _id: { type: String, required: true, default: () => new ObjectId().toString() },
//     name: { type: String, required: true },
//     user: { type: String, ref: 'User', required: true }
// });

// UserSchema.pre<IUser>('save', async function (next) {

// const user = this;

// if (user.isModified('coordinates')) {
//     user.address = await lib.getAddressFromCoordinates(user.coordinates);
// } else if (user.isModified('address')) {
//     const { lat, lng } = await lib.getCoordinatesFromAddress(user.address);
//     user.coordinates = [lng, lat];
// }
//     next();
// });

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
// const RegionModel: Model<IRegion> = model<IRegion>('Region', RegionSchema);


