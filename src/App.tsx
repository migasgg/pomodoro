import { ThemeProvider } from "styled-components";
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from "./style/theme/default"
import { GlobalStyle } from "./style/global"
import { Router } from "./Router";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
