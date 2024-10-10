import { Router, Request, Response, NextFunction } from 'express';
import { getXataClient } from '../xata';
import { validateUser, validateUserId } from '../middleware/validators';
import { validationResultHandler } from '../middleware/validationResultHandler';

const router = Router();
const xata = getXataClient();

// GET all users in the db
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await xata.db.User.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// CREATE a new user
router.post('/', validateUser, validationResultHandler, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const createdUser = await xata.db.User.create(user);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
});

// EDIT user data
router.put('/:id', validateUserId, validateUser, validationResultHandler, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await xata.db.User.update(id, user);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE user records
router.delete('/:id', validateUserId, validationResultHandler, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await xata.db.User.delete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;