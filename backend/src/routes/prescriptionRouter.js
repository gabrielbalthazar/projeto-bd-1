import express from "express";
import * as prescriptionController from "../controllers/prescriptionController.js";

const router = express.Router();

router.post('/', prescriptionController.create);
router.get('/', prescriptionController.findAll);
router.put('/:id', prescriptionController.update);

export default router;