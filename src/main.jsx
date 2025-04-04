import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ChatbotLoader from "./components/ChatbotLoader";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ChatbotLoader />
  </StrictMode>,
);

//testando commit do git
