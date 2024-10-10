import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import userRoutes from './routes/users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Custom middleware
app.use(logger);

// Routes
app.use('/api/users', userRoutes);

// Handle undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
