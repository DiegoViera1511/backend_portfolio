import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {appRouter} from "./appRouter";
import {UserModel} from "./features/Users/userModel";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userModel = new UserModel();

// Routes
app.use('/api', appRouter(userModel));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});