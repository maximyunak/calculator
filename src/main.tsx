import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ThemeProvider } from './providers/ThemeContextProvider.tsx';

const Root = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
