import express from "express";
import * as meetingController from "../controllers/meetingController.js";

const router = express.Router();

router.post('/', meetingController.create);
router.get('/', meetingController.findAll);
router.put('/:id', meetingController.update);

export default router;
