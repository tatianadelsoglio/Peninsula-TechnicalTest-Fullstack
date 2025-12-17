import { Router } from "express";
import { updateAccountSaldo } from "../controllers/AccountController";

const router = Router();

router.post("/account", updateAccountSaldo);

export default router;
