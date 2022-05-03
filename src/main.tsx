import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Authenticated from './components/Authenticated'
import LoginPage from './components/Login'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import RequiresAuth from './providers/RequiresAuth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='login' element={<LoginPage />} />
          </Route>
          <Route path='/dashboard' element={
            <RequiresAuth>
              <Authenticated/>
            </RequiresAuth>}>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
