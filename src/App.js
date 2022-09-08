import Router from "./router/Router.js";
import { Provider } from "react-redux";
import store from "./store.js";

import { ThemeProvider } from "styled-components";
import theme from "./Theme.js";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
