import { Router } from "express";
import { authenticateToken } from "../middleware/authendicate";
import { addRoommates, deleteRoommate, getRoommates, getRoommatesWithoutPagination, updateRoommates } from "../controller/roommatesController";

const router: Router = Router();

router.post("/addroommate",authenticateToken,addRoommates)
router.get("/getallroommate",authenticateToken,getRoommatesWithoutPagination)
router.get("/getroommate",authenticateToken,getRoommates)
router.patch("/updateroommate/:id/",authenticateToken,updateRoommates)
router.delete("/deleteroommate/:id/",authenticateToken,deleteRoommate)

export default router