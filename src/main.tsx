import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import LoginPage from './components/Login'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import RequiresAuth from './providers/RequiresAuth'
import ItemsPage from "./components/Items";
import ItemsProvider from "./providers/ItemsProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={
              <RequiresAuth>
                <ItemsProvider>
                  <ItemsPage />
                </ItemsProvider>
              </RequiresAuth>}
            />
            <Route path='login' element={<LoginPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
