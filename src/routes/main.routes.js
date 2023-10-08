import {Router} from 'express'
import { getGJSongInfo } from './info.routes.js';

const router = Router();


// router.get('/', rootRoute);
router.use('/req', getGJSongInfo)

export default router;