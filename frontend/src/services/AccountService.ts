import type {
  Account,
  UpdateAccountRequest,
  ApiError,
} from "../types/AccountTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL no está definido");
}

export const updateAccountSaldo = async (
  payload: UpdateAccountRequest
): Promise<Account> => {
  const response = await fetch(`${API_BASE_URL}account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = data as ApiError;
    throw new Error(error.message || "Error al actualizar el saldo");
  }

  return data as Account;
};
