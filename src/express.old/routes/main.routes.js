import { Router } from "express";
import { getUsers } from "../database/db.functions.js";
import { testUserInsertQuery, testUserQuery } from "../database/db.devFunctions.js";
import getSong from "../api/getSong.js";

const router = Router();

// Comming Soon
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const usersQuery = await getUsers(id);

  if (!usersQuery.error) return res.status(200).send(usersQuery.result.rows);
  else return res.status(500).send(usersQuery.error);
});

export default router;