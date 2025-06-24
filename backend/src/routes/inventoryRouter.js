import express from "express";
import * as inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

router.post('/', inventoryController.create);
router.get('/', inventoryController.findAll);
router.get('/:id', inventoryController.findOne);
router.put('/:id', inventoryController.update);
router.delete('/:id', inventoryController.remove);

export default router;