import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Divider,
  Alert,
} from "@mui/material";
import { useState } from "react";

type Result = {
  index: number;
  status: "success" | "error";
  message: string;
};

interface Props {
  loading: boolean;
  simulateConcurrentRequests: (
    requests: number,
    amount: number,
    type: "deposit" | "withdraw"
  ) => Promise<Result[]>;
  onClose: () => void;
}

export const ConcurrencySimulator = ({
  loading,
  simulateConcurrentRequests
}: Props) => {
  const [requests, setRequests] = useState<number | undefined>(7);
  const [amount, setAmount] = useState<number | undefined>(300);
  const [type, setType] = useState<"deposit" | "withdraw">("withdraw");
  const [results, setResults] = useState<Result[]>([]);

  const handleRun = async () => {
    setResults([]);
    const res = await simulateConcurrentRequests(
      requests ?? 7,
      amount ?? 300,
      type
    );

    setResults(res);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Simulador de concurrencia</Typography>

      <TextField
        label="Cantidad de requests"
        type="number"
        value={requests === undefined ? "" : requests}
        onChange={(e) => {
          const val = e.target.value;
          setRequests(val === "" ? undefined : Number(val));
        }}
      />

      <TextField
        label="Monto"
        type="number"
        value={amount === undefined ? "" : amount}
        onChange={(e) => {
          const val = e.target.value;
          setAmount(val === "" ? undefined : Number(val));
        }}
      />

      <TextField
        select
        label="Tipo de operación"
        value={type}
        onChange={(e) => setType(e.target.value as "deposit" | "withdraw")}
      >
        <MenuItem value="withdraw">Extracción</MenuItem>
        <MenuItem value="deposit">Depósito</MenuItem>
      </TextField>

      {loading ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CircularProgress size={20} />
          <Typography variant="body2">Ejecutando simulación…</Typography>
        </Box>
      ) : (
        <Button type="button" variant="contained" onClick={handleRun}>
          Ejecutar simulación
        </Button>
      )}

      {results.length > 0 && (
        <>
          <Divider />
          <Typography variant="subtitle2">Resultados</Typography>

          {/* Contenedor scrollable */}
          <Box
            sx={{
              maxHeight: 150, // altura máxima antes de scroll
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {results.map((r) => (
              <Alert
                key={r.index}
                severity={r.status === "success" ? "success" : "warning"}
              >
                Request #{r.index + 1}: {r.message}
              </Alert>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
