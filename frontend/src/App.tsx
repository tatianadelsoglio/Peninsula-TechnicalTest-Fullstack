import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouter } from "./routing/AppRouter";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
