import express from 'express';
import mongoose from 'mongoose';
import regionRoutes from './routes/regionRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/regions', regionRoutes);

app.listen(3000, () => {
    mongoose.connect('mongodb://admin:admin@localhost:27018/?retryWrites=true&w=majority')
    console.log("----- Server running -----")
});