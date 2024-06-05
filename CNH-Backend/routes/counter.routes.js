import { Router } from "express";
import { 
    counterEmergencyDecrement,
    counterEmergencyIncrement,
    counterNormalDecrement, 
    counterNormalIncrement, 
    getCounters 
} from "../controller/counter.controller.js";

const router = Router();

router.route("/increment-normal").patch(counterNormalIncrement)
router.route("/decrement-normal").patch(counterNormalDecrement)
router.route("/getCounters").get(getCounters);
router.route("/increment-emergency").patch(counterEmergencyIncrement)
router.route("/decrement-emergency").patch(counterEmergencyDecrement)

export default router;