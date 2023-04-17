import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
 import { AuthContextProvider } from './context/AuthContext';
 import { BrowserRouter  } from "react-router-dom";
import { ChatContextProvider } from './context/ChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>

  <React.StrictMode>
    <BrowserRouter>
    <App />

    </BrowserRouter>

   </React.StrictMode>
   </ChatContextProvider>

  </AuthContextProvider>

);
