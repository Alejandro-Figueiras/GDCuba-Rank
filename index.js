import app from "./src/app.js";
import exppress from 'express'
import { projectConfig } from "./src/config/main.config.js";

// Configure static file for render
app.use('/', exppress.static('public'))

app.listen(projectConfig.port, () => {
  console.log(`GD Cuba Rank app listening on port ${projectConfig.port}`);
});
