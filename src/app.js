import express from 'express'
import router from './routes/main.routes.js';
import apiRouter from './routes/api.routes.js';
import './database/db.config.js'

const app = express();
app.use(router);
app.use('/api', apiRouter)

export default app;