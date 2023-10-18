import express from 'express'
import router from './routes/main.routes.js';
import apiRouter from './routes/api.routes.js';
import './database/db.config.js'
import { middlewaresConfig } from './middlewares/middlewares.config.js';

const app = express();
// middlewares
middlewaresConfig(app);

app.use(router);
app.use('/api', apiRouter)

export default app;