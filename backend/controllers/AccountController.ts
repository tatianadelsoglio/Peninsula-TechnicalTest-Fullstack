import { Request, Response } from "express";
import {
  getAccountIdByUsername,
  updateSaldo,
} from "../services/AccountService";

//Actualizo el saldo de una cuenta
export const updateAccountSaldo = async (req: Request, res: Response) => {
  try {
    const { username, amount, type } = req.body;

    if (!username || !amount || !type) {
      return res.status(400).json({
        message: "Usuario, monto y tipo de transacción son obligatorios",
      });
    }

    const accountId = await getAccountIdByUsername(username);

    const updatedAccount = await updateSaldo({
      accountId,
      amount,
      type,
    });

    return res.status(200).json(updatedAccount);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Error al actualizar el saldo",
    });
  }
};
