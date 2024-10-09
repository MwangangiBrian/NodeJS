import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getXataClient, User } from './xata';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

const xata = getXataClient();

// middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// GET all users in the db
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await xata.db.User.getAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE a new user
app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const createdUser = await xata.db.User.create(user);
    res.json(createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// EDIT user data
app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await xata.db.User.update(id, user);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE user records
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await xata.db.User.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} 👍👍`);
});
