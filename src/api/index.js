import { Router } from 'express';
import author from './author';
import book from './book';
import user from './user';
import auth from './auth';

const router = new Router();
router.use('/authors', author);
router.use('/books', book);
router.use('/user', user);
router.use('/auth',auth);

export default router