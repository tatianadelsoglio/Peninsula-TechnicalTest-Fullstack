import Account, { IAccount } from "../models/AccountModel";

type OperationType = "deposit" | "withdraw";

export const initializeTestAccount = async (): Promise<IAccount> => {
  const username = "peninsulaTest";

  let account = await Account.findOne({ username });

  if (!account) {
    account = await Account.create({
      username,
      saldo: 0,
      version: 0,
    });

    console.log("Cuenta de prueba creada:", username);
  } else {
    console.log("Cuenta de prueba existente:", username);
  }

  return account;
};

export const getAccountIdByUsername = async (
  username: string
): Promise<string> => {
  const account = await Account.findOne({ username });

  if (!account) {
    throw new Error("Cuenta no encontrada");
  }

  return account._id.toString();
};

interface UpdateSaldoParams {
  accountId: string;
  amount: number;
  type: OperationType;
}

const MAX_RETRIES = 3;

export const updateSaldo = async ({
  accountId,
  amount,
  type,
}: UpdateSaldoParams): Promise<IAccount> => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    const account = await Account.findById(accountId);

    if (!account) {
      throw new Error("Cuenta no encontrada");
    }

    if (amount <= 0) {
      throw new Error("El monto debe ser mayor a cero");
    }

    let newSaldo = account.saldo;

    if (type === "deposit") {
      newSaldo += amount;
    }

    if (type === "withdraw") {
      if (account.saldo < amount) {
        throw new Error("Saldo insuficiente");
      }
      newSaldo -= amount;
    }

    const updatedAccount = await Account.findOneAndUpdate(
      {
        _id: accountId,
        version: account.version,
      },
      {
        saldo: newSaldo,
        $inc: { version: 1 },
      },
      {
        new: true,
      }
    );

    if (updatedAccount) {
      return updatedAccount;
    }

    // Si falla, es por conflicto de versión
    retries++;
  }

  throw new Error("Conflicto de concurrencia, intente nuevamente");
};
