import mongoose, { Document, Model, Schema, Types, model } from 'mongoose';

interface IRegion extends Document {
    _id: string;
    name: string;
    coordinates: [number, number];
    userId: Types.ObjectId;
}

const RegionSchema: Schema<IRegion> = new Schema<IRegion>({
    _id: { type: String, required: true, default: () => new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    coordinates: { type: [Number], required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const RegionModel: Model<IRegion> = model<IRegion>('Region', RegionSchema);