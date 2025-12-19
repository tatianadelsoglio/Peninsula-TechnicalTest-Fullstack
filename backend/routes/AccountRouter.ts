import { Router } from "express";
import { updateAccountSaldo, getAccount } from "../controllers/AccountController";

const router = Router();

router.get("/account/:username", getAccount);
router.post("/account", updateAccountSaldo);

export default router;
