import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import testRoutes from './routes/testRoute';
import { connectDB } from './config/database';
import { swaggerDocs } from './config/swagger';
import taskRoute from './routes/taskRoute';
import authRoute from './routes/authRoute';

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
app.use('/api/tasks', taskRoute);
app.use('/api/auth', authRoute);

// Test Conditional: it will only start the server and connect to real db if is not a test
if (process.env.NODE_ENV !== 'test') {
  // DB Connection
  connectDB()
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));
  
  // Server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;