import { Router } from 'express'
import { song, emptySong } from '../controllers/api.js';
import { check } from 'express-validator'
import checkApi from '../middlewares/checkApi.js';
import { getUser } from '../api/gbbrowser/getUser.js';

const router = Router();

router.use('/song/:id', [
    check('id').notEmpty(),
    check('id').isNumeric(),
    checkApi
], song);
router.use('/song/', emptySong);

router.get('/user/:name', async(req, res) => {
    const {name} = req.params;
    const data = await getUser(name);
    
    return res.send(data);
})

export default router;