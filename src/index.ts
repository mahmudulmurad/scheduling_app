import express, { Request, Response } from 'express';
import 'dotenv/config';
import { connectDB } from './db/Connection';
const routes = require('./route');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

app.get('/', (req: Request, res: Response) => {
	res.send('Express application is up and running 🚀🎉');
});

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(port, () => {
	console.log(`Express server is up and running at http://localhost:${port} 🔥🚀🚀🚀🔥`);
});
