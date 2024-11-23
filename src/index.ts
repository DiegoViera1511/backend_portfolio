import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {appRouter} from "./appRouter";
import {UserModel} from "./features/Users/userModel";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json());

const corsOptions = {
    origin: 'https://vieraportfoliowithlogin.netlify.app',
    optionsSuccessStatus: 200
};
app.options('/', (req, res) => {
    //añadir cabeceras para hacer acciones con la api
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //Para hacer la acción hay que hacer res.send()
    res.send(200)
})

app.use(cors());

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