import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={store.persistor}> */}
          <App />
          {/* </PersistGate> */}
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
