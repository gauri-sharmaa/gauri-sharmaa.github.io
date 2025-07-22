import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <App />
        </ThemeProvider>
    </ErrorBoundary>
);
