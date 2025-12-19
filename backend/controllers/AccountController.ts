import { Request, Response } from "express";
import {
  getAccountIdByUsername,
  updateSaldo,
  getAccountByUsername
} from "../services/AccountService";

// Obtener información de la cuenta
export const getAccount = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "El username es obligatorio" });
    }

    const account = await getAccountByUsername(username);

    return res.status(200).json(account);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Error al obtener la cuenta",
    });
  }
};

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
