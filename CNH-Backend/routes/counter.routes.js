import { Router } from "express";
import { 
    counterNormalDecrement, 
    counterNormalIncrement, 
    getCounters 
} from "../controller/counter.controller.js";

const router = Router();

router.route("/increment-normal").get(counterNormalIncrement)
router.route("/decrement-normal").get(counterNormalDecrement)
router.route("/getCounters").get(getCounters);

export default router;