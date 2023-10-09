import { projectConfig } from "./src/config/main.config.js";
import app from "./src/app.js";
import express from 'express'

// Configure static file for render
app.use('/', express.static('public'))

app.listen(projectConfig.port, () => {
  console.log(`GD Cuba Rank app listening on port ${projectConfig.port}`);
});
