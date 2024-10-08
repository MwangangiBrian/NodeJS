import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { getXataClient, User } from './xata';
import { get } from 'http';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

const xata = getXataClient();

// middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Get the current directory
const _dirname = path.resolve();

// GET all users in the db
app.get('/api/jobs', async (req: Request, res: Response) => {
  const users = await xata.db.User.getAll();
  res.json(users);
});

// CREATE a new user
app.post('/api/jobs', async (req: Request, res: Response) => {
  const user = req.body;
  const createdUser = await xata.db.User.create(user);
  res.json(createdUser);
});

// EDIT user data
app.put('/api/jobs/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.body;
  const updatedUser = await xata.db.User.update(id, user);
  res.json(updatedUser);
});

// DELETE user records
app.delete('/api/jobs/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedRecord = await xata.db.User.delete(id);
  res.json(deletedRecord);
});

// Start the server
app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 👍👍 `
  );
});
