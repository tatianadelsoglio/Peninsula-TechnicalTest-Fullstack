// Operaciones permitidas sobre la cuenta
export type OperationType = "deposit" | "withdraw";

// Modelo de cuenta tal como viene del backend
export interface Account {
  _id: string;
  username: string;
  saldo: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// Request para actualizar saldo
export interface UpdateAccountRequest {
  username: string;
  amount: number;
  type: OperationType;
}

// Error estándar del backend
export interface ApiError {
  message: string;
}
