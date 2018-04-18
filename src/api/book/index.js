import { Router } from 'express'
import {create, index, show} from "./controller";
import {token} from "../../services/passport";


const router = new Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', token({ required: true}), create);

export default router