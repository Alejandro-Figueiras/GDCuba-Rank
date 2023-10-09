import { Router } from "express";
import { getUsers } from "../database/db.functions.js";

const router = Router();

// router.get('/', rootRoute);
// Comming Soon
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const usersQuery = await getUsers(id);

  if (usersQuery.status == "ok") return res.status(200).send(usersQuery.result);
  else return res.status(500).send(usersQuery.error);
});

export default router;