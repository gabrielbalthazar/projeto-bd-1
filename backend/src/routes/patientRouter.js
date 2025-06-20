import express from "express";
import * as patientController from "../controllers/patientController.js";

const router = express.Router();

router.post('/', patientController.create);
router.get('/', patientController.findAll);
router.get('/:id', patientController.findOne);
router.put('/:id', patientController.update);
router.delete('/:id', patientController.remove);

export default router;