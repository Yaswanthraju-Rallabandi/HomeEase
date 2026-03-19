import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("[v0] Mounting app...");
const root = document.getElementById('root');
console.log("[v0] Root element:", root);

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log("[v0] App rendered");
} else {
  console.error("[v0] Root element not found!");
}
