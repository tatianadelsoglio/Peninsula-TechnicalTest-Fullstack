import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #b6ff6a 0%, #fff3a0 100%)",
      }}
    >
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
};
