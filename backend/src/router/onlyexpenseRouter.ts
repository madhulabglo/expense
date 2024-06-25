import { Router } from "express";
import { authenticateToken } from "../middleware/authendicate";
import {
  addonlyexpense,
  onlyExpenseDelete,
  onlyExpenseUpdate,
  onlyExpenselistWithPagination,
  onlyexpenselistWithoutPagination,
  specifiPersonCalculation,
} from "../controller/onlyexpenseController";

const router: Router = Router();

router.post("/onlyexpense", authenticateToken, addonlyexpense);
router.get(
  "/onlyallexpense",
  authenticateToken,
  onlyexpenselistWithoutPagination
);
router.get("/onlyexpense", authenticateToken, onlyExpenselistWithPagination);
router.patch("/onlyexpense/:id/", authenticateToken, onlyExpenseUpdate);
router.delete("/onlyexpense/:id/", authenticateToken, onlyExpenseDelete);
router.get(
  "/specificcalculation",
  authenticateToken,
  specifiPersonCalculation
);

export default router;
