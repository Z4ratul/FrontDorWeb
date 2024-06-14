import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#F4C55C",
            colorBorder: "black",
            // Alias Token
            colorBgContainer: "#b1b1b1",
            
          },
        }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
export const BASE_URL = "http://dortechs.ru";
