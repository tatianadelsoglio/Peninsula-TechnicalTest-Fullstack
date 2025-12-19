import { Box, Typography, CircularProgress } from "@mui/material";
import type { Account } from "../../types/AccountTypes";

interface Props {
  account: Account | null;
  loading: boolean;
}

export const SaldoCard = ({ account, loading }: Props) => {
  return (
    <Box
      textAlign="center"
      sx={{
        py: 2,
        borderRadius: 2,
        backgroundColor: "grey.100",
        border: "1px solid",
        borderColor: "grey.300",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        Saldo actual
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <CircularProgress size={32} />
        ) : account ? (
          <>
            <Typography variant="h3" fontWeight={700}>
              $ {account.saldo.toFixed(2)}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Versión: {account.version}
            </Typography>
          </>
        ) : (
          <Typography variant="h3" fontWeight={700}>
            $ 0.00
          </Typography>
        )}
      </Box>
    </Box>
  );
};
