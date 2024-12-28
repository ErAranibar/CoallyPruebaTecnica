import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import testRoutes from './routes/testRoute';
import { connectDB } from './config/database';
import { swaggerDocs } from './config/swagger';

// Config
dotenv.config();
const app: Application = express();
const port: string = process.env.PORT || '8000';
// Swagger
swaggerDocs(app, port);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/', testRoutes);

// DB Connection
connectDB()
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
