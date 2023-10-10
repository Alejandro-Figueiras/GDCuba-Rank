import { Router } from "express";
import { getUsers } from "../database/db.functions.js";
import { testUserInsertQuery, testUserQuery } from "../database/db.devFunctions.js";
import getSong from "../api/getSong.js";

const router = Router();

// router.get('/', rootRoute);

// Prueba de Backend
const launchTime = new Date();
router.get('/', async(req, res) => {
	const song = await getSong(req, 693041);
	const testUser = (await testUserQuery()).rows[0]
    res.send(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>GD Cuba ΔΔΔ</title>
		<style>
			body {
				font-family: Helvetica, Arial, sans-serif;
			}
		</style>
	</head>
	<body>
		<h1>GD Cuba ΔΔΔ: Prueba de Backend</h1>
		<hr>
	
		<h2>Integración con los servers de Robtop</h2>
		<p>${JSON.stringify(song)}</p>
	
		<h2>Integración con la base de datos</h2>
		<p>${JSON.stringify(testUser)}</p>

		<h2>Launch Time </h2>
		<p>${launchTime.getDate()}/${launchTime.getMonth()+1}/${launchTime.getFullYear()} => ${launchTime.getHours()}/${launchTime.getMinutes()}</p>
	</body>
	</html>`)
})

// Comming Soon
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const usersQuery = await getUsers(id);

  if (!usersQuery.error) return res.status(200).send(usersQuery.result.rows);
  else return res.status(500).send(usersQuery.error);
});

export default router;