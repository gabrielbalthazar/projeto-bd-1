import express from "express";
import * as generateController from "../controllers/generateController.js";

const router = express.Router();

router.post('/', generateController.create);
router.get('/', generateController.findAll);
router.put('/:id', generateController.update);

export default router;