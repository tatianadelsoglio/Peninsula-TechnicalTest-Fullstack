import { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import {
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Alert,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAccount } from "../../hooks/useAccount";
import { SaldoCard } from "../account/SaldoCard";
import { AccountActions } from "../account/AccountActions";
import { ConcurrencySimulator } from "../account/ConcurrencySimulator";

export const AccountPage = () => {
  const {
    account,
    loadingAccount,
    loadingOperation,
    loadingConcurrency,
    error,
    deposit,
    withdraw,
    simulateConcurrentRequests,
  } = useAccount();

  const [openConcurrency, setOpenConcurrency] = useState(false);

  return (
    <MainLayout>
      <Box display="flex" justifyContent="center" sx={{ mt: 2, width: "100%" }}>
        <Box
          sx={{
            width: openConcurrency ? 810 : 600,
            transition: "width 0.3s ease",
          }}
        >
          <Card
            sx={{
              maxHeight: 650,
              width: "100%",
              borderRadius: 3,
              boxShadow: 3,
              p: 3,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {loadingAccount ? (
                <Box display="flex" justifyContent="center" sx={{ py: 6 }}>
                  <CircularProgress size={48} />
                </Box>
              ) : (
                <Box display="flex">
                  <Box
                    sx={{
                      width: openConcurrency ? 450 : "100%",
                      pr: openConcurrency ? 2 : 0,
                    }}
                  >
                    <Stack spacing={1.5}>
                      {/* Header */}
                      <Box textAlign="center">
                        <Typography variant="h4" fontWeight={700}>
                          {account?.username ?? "peninsulaTest"}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          Cuenta bancaria
                        </Typography>
                      </Box>

                      <Divider />

                      {/* Saldo */}
                      <SaldoCard account={account} loading={loadingOperation} />

                      {/* Error */}
                      {error && <Alert severity="error">{error}</Alert>}

                      {/* Operaciones */}
                      <AccountActions
                        onDeposit={deposit}
                        onWithdraw={withdraw}
                        loading={loadingOperation}
                      />

                      <Divider />

                      {/* Concurrencia */}
                      <Button
                        type="button"
                        variant="outlined"
                        endIcon={
                          openConcurrency ? (
                            <ArrowBackIosNewIcon />
                          ) : (
                            <ArrowForwardIosIcon />
                          )
                        }
                        onClick={() => setOpenConcurrency((prev) => !prev)}
                      >
                        Simulador de concurrencia
                      </Button>
                    </Stack>
                  </Box>

                  {openConcurrency && (
                    <Box
                      sx={{
                        width: 360,
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        pl: 2,
                      }}
                    >
                      <ConcurrencySimulator
                        loading={loadingConcurrency}
                        simulateConcurrentRequests={simulateConcurrentRequests}
                        onClose={() => setOpenConcurrency(false)}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
};
