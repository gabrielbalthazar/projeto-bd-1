import { Router } from "express";
import * as doctorController from "../controllers/doctorController.js";

const router = Router();

router.post('/', doctorController.create);
router.get('/', doctorController.findAll);
router.get('/:id', doctorController.findOne);
router.put('/:id', doctorController.update);
router.delete('/:id', doctorController.remove);

export default router;