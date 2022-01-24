import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useContext } from "react";
import Todo from "./components/Todo/index";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const {
    state: { theme },
    dispatch,
  } = useContext(GlobalContext);
  const customTheme = createTheme({
    background: {
      primary: theme === "dark" ? "hsl(235, 21%, 11%)" : "hsl(0, 0%, 97%)",
      secondary: theme === "dark" ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)",
    },
    hero:
      theme === "dark"
        ? "url(/images/hero-dard.jpg)"
        : "url(/images/hero-light.jpg)",
    hero2:
      theme === "dark"
        ? "/images/bg-mobile-dark.jpg"
        : "/images/bg-mobile-light.jpg",
    color: {
      primary: theme == "dark" ? "hsl(0, 0%, 98%)" : " hsl(235, 24%, 19%)",

      border: theme === "dark" ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)",
      border2: theme === "dark" ? "#2E4C6D" : "#D3E4CD",
    },
  });
  return (
    <ThemeProvider theme={customTheme}>
      <Todo />;
    </ThemeProvider>
  );
}

export default App;
