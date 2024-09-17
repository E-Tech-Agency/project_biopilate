import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/index.css';
import '@/styles/App.css';
import { ThemeProvider } from "@/components/shared/theme-provider";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
