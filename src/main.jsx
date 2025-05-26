import App from "./App";

import React from "react";
import "../public/css/tailwind.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { ToastContainer } from 'react-toastify'
import { AdminContextProvider } from "./components/contextProvider/AdminContextProvider";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
              <QueryClientProvider client={queryClient}> 
        <AdminContextProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
        </AdminContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
