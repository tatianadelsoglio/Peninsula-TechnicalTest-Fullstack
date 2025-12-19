import { Stack, Button, TextField } from "@mui/material";
import { useState } from "react";
import "../../App.css";

interface Props {
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  loading: boolean;
}

export const AccountActions = ({ onDeposit, onWithdraw, loading }: Props) => {
  const [amount, setAmount] = useState<number | null>(null);

  const handleChange = (value: number) => {
    if (Number.isNaN(value)) {
      setAmount(null);
      return;
    }

    if (value < 0) return;

    setAmount(value);
  };

  const handleDeposit = () => {
    onDeposit(amount!);
    setAmount(null); // limpia el campo
  };

  const handleWithdraw = () => {
    onWithdraw(amount!);
    setAmount(null); // limpia el campo
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Monto"
        type="number"
        value={amount ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.valueAsNumber)
        }
        fullWidth
        inputProps={{
          min: 0,
          step: "any",
        }}
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={loading || amount === null || amount <= 0}
          onClick={handleDeposit}
        >
          Depositar
        </Button>

        <Button
          variant="contained"
          color="error"
          fullWidth
          disabled={loading || amount === null || amount <= 0}
          onClick={handleWithdraw}
        >
          Extraer
        </Button>
      </Stack>
    </Stack>
  );
};
