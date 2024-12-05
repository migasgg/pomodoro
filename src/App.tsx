import { ThemeProvider } from "styled-components";
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from "./style/theme/default"
import { GlobalStyle } from "./style/global"  
import { Router } from "./Router";
import { CycleContextProvider } from "./context/CycleContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router/>
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
