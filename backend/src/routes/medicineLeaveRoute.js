import express from "express";
import * as medicineLeaveController from "../controllers/medicineLeaveController.js";

const router = express.Router();

router.post('/', medicineLeaveController.create);
router.get('/', medicineLeaveController.findAll);
router.put('/:id', medicineLeaveController.update);

export default router;