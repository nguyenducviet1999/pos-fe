import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider } from "react-redux";
import { store } from "@src/stores/root-stores";
const AppWrapper = () => {
  if (APP_ENV.MODE !== "development") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
  }

  return (
    <Provider store={store}>
      <StrictMode>
        <Toaster />
        <App />
      </StrictMode>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<AppWrapper />);
