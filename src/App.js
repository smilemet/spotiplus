import Router from "./router/Router.js";

import { ThemeProvider } from "styled-components";
import theme from "./Theme.js";

function App() {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
