import express from "express";
import { addEquipment, getEquipments, searchEquipments } from "../controllers/equipments.js";
import validateUser from "../middlewares/auth.js"

const router = express.Router();

router.get("/", validateUser, getEquipments, searchEquipments, async(req, res)=>res.json(res.equipments));

router.post("/", validateUser, addEquipment);

export default router;