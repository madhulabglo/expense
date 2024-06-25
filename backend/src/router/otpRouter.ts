import { Router } from "express";
import { otpgenerator, verifyOtp } from "../controller/otpController";

const router: Router = Router();

router.post("/", otpgenerator);
router.post("/verify-otp", verifyOtp);

export default router;
