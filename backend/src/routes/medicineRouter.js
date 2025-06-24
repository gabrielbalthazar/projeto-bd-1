import express from "express";
import * as medicineController from "../controllers/medicineController.js";

const router = express.Router();

router.post('/', medicineController.create);
router.get('/', medicineController.findAll);
router.get('/:id', medicineController.findOne);
router.put('/:id', medicineController.update);
router.delete('/:id', medicineController.remove);

export default router;
