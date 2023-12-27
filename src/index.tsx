import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from 'react';
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);