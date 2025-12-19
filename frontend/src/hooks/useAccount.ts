/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import type { Account } from "../types/AccountTypes";
import { updateAccountSaldo } from "../services/AccountService";

const USERNAME = "peninsulaTest";

export const useAccount = () => {
  const [account, setAccount] = useState<Account | null>(null);

  const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
  const [loadingOperation, setLoadingOperation] = useState<boolean>(false);
  const [loadingConcurrency, setLoadingConcurrency] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Función para traer la cuenta del backend
  const fetchAccount = async (showLoading = true) => {
    const start = Date.now();

    try {
      if (showLoading) setLoadingAccount(true);
      setError(null);

      const res = await fetch(`http://localhost:3000/account/${USERNAME}`);
      if (!res.ok) throw new Error("No se pudo cargar la cuenta");

      const data: Account = await res.json();
      setAccount(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la cuenta");
    } finally {
      //setLoadingAccount(false);
      const end = Date.now() - start;
      const MIN_LOADING_TIME = 600;

      if (end < MIN_LOADING_TIME) {
        setTimeout(() => setLoadingAccount(false), MIN_LOADING_TIME - end);
      } else {
        setLoadingAccount(false);
      }
    }
  };

  // Función para ejecutar depósitos o extracciones
  const executeOperation = async (
    amount: number,
    type: "deposit" | "withdraw"
  ) => {
    const start = Date.now();

    try {
      setLoadingOperation(true);
      setError(null);

      const updatedAccount = await updateAccountSaldo({
        username: USERNAME,
        amount,
        type,
      });
      setAccount(updatedAccount);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error inesperado");
    } finally {
      //setLoadingOperation(false);
      const end = Date.now() - start;
      const MIN_LOADING_TIME = 600;

      if (end < MIN_LOADING_TIME) {
        setTimeout(() => setLoadingOperation(false), MIN_LOADING_TIME - end);
      } else {
        setLoadingOperation(false);
      }
    }
  };

  const deposit = (amount: number) => executeOperation(amount, "deposit");
  const withdraw = (amount: number) => executeOperation(amount, "withdraw");

  // Simulación de concurrencia

  type ConcurrencyResult = {
    index: number;
    status: "success" | "error";
    message: string;
  };

  const simulateConcurrentRequests = async (
    requests: number,
    amount: number,
    type: "deposit" | "withdraw"
  ): Promise<ConcurrencyResult[]> => {
    try {
      setLoadingConcurrency(true);
      setError(null);

      const promises = Array.from({ length: requests }).map(() =>
        updateAccountSaldo({ username: USERNAME, amount, type })
      );

      const results = await Promise.allSettled(promises);

      const formattedResults: ConcurrencyResult[] = results.map((r, index) => {
        if (r.status === "fulfilled") {
          return {
            index,
            status: "success",
            message: "Operación exitosa",
          };
        }

        const backendMessage =
          r.reason?.response?.data?.message ||
          r.reason?.message ||
          "Error desconocido";

        return {
          index,
          status: "error",
          message: backendMessage,
        };
      });

      await fetchAccount(false);
      return formattedResults;
    } catch (err) {
      setError("Error al simular concurrencia");
      return [];
    } finally {
      setLoadingConcurrency(false);
    }
  };

  //Inicializar la cuenta al montar el hook
  useEffect(() => {
    fetchAccount();
  }, []);

  return {
    account,
    loadingAccount,
    loadingOperation,
    loadingConcurrency,
    error,
    deposit,
    withdraw,
    simulateConcurrentRequests,
  };
};
