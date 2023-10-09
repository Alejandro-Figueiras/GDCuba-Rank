import { Router } from 'express'
import { song, emptySong } from '../controllers/api.js';
import { check } from 'express-validator'
import checkApi from '../middlewares/checkApi.js';

const router = Router();

router.use('/song/:id', [
    check('id').notEmpty(),
    check('id').isNumeric(),
    checkApi
], song);
router.use('/song/', emptySong);

export default router;