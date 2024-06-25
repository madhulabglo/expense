import { Router } from "express";
import { addExpense, deleteExpense, getExpense, getExpenseWithoutPagination, updateExpense } from "../controller/expenseController";
import { authenticateToken } from "../middleware/authendicate";

const router : Router = Router()

router.get("/getallexpense",authenticateToken,getExpenseWithoutPagination)
router.post("/addexpense",authenticateToken,addExpense)
router.get("/getexpense",authenticateToken,getExpense)
router.patch("/updateexpense/:id/",authenticateToken,updateExpense)
router.delete("/deleteexpense/:id/",authenticateToken,deleteExpense)


export default router