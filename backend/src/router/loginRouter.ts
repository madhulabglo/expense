import { Router } from "express"
import {getOtp, verifyOtp} from "../controller/loginController"

const router: Router = Router()

router.post("/login", getOtp)
router.post("/verifyotp",verifyOtp)


export default router