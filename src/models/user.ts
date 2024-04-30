import mongoose, { Document, Model, Schema, model } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    address: string;
    coordinates: [number, number];
    regions: string[];
}

interface IRegion extends Document {
    _id: string;
    name: string;
    user: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    _id: { type: String, required: true, default: () => new ObjectId().toString() },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    regions: [{ type: Schema.Types.ObjectId, ref: 'Region' }]
});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);


