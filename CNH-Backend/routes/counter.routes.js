import { Router } from "express";
import { counterNormalDecrement, counterNormalIncrement } from "../controller/counter.controller.js";

const router = Router();

router.route("/increment-normal").get(counterNormalIncrement)
router.route("/decrement-normal").get(counterNormalDecrement)

export default router;