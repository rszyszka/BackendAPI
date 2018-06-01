import { Router } from 'express'
import {index, show, create, update, destroy, searchByName, searchByNationality, searchByBirthday, count, listcount, paginatedIndex, moviesByActor} from './controller'
import {token} from "../../services/passport";


const router = new Router();

// Other examples - not necessary but can upgrade your mark
router.get('/search/name/:name', searchByName);
router.get('/search/name/:nationality', searchByNationality);
router.get('/search/birthday/:min/:max', searchByBirthday);
router.get('/count', count);
router.get('/list', listcount);
router.get('/index/:limit?/:skip?', paginatedIndex);
router.get('/:id/movies', moviesByActor);

// Start here
// Core examples - you need to have it in your project!
router.get('/', index);
router.get('/:id', show);
router.post('/', token({ required: true}), create);
router.put('/:id', token({ required: true}), update);
router.delete('/:id', token({ required: true}), destroy);


export default router