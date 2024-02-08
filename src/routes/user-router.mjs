import Express from 'express';
import {
  getUserById,
  getUsers,
  postUser,
  postLogin,
  putUser,
  deleteUser,
} from '../controllers/user-controller.mjs';

const userRouter = Express.Router();

// list users
userRouter.get('/', getUsers);
// get info of a user
userRouter.get('/:id', getUserById);
// user registration
userRouter.post('/', postUser);
// user login
userRouter.post('/login', postLogin);
// update user
userRouter.put('/:id', putUser);

userRouter.delete('/:id', deleteUser)

export default userRouter;
