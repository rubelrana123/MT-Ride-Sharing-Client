import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./provider/theme.provider";
 
import { Provider } from "react-redux";
import { store } from "./redux/store";
 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
 <Provider store={store}>

 <ThemeProvider defaultTheme="system" storageKey="mt-ride-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
  
 </Provider>
  </React.StrictMode>
);