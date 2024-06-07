import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MyContextProvider } from "./Services/Context.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MyContextProvider>
      <Toaster position="top-right" reverseOrder={false} /> <App />
    </MyContextProvider>
  </BrowserRouter>
);
