import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import LoginPage from './components/Login'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import RequiresAuth from './providers/RequiresAuth'
import ItemsPage from './components/Items'
import Layout from './components/shared/Layout'
import ItemsProvider from './providers/ItemsProvider'
import RedirectOnLogged from './providers/RedirectOnLogged'
import ListProvider from './providers/ListProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListProvider>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path="items" element={<RequiresAuth><Layout/></RequiresAuth>}>
                <Route index element={<ItemsProvider><ItemsPage/></ItemsProvider>}/>
                <Route path="history" element={<h1>History page</h1>} />
              </Route>
              <Route index element={<RedirectOnLogged><LoginPage /></RedirectOnLogged>} />
            </Route>
          </Routes>
        </ListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
