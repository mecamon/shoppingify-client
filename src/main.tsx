import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import LoginPage from './components/PageLoginRegister'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import RequiresAuth from './providers/RequiresAuth'
import ItemsPage from './components/PageItems'
import Layout from './components/shared/Layout'
import ItemsProvider from './providers/ItemsProvider'
import RedirectOnLogged from './providers/RedirectOnLogged'
import ListProvider from './providers/ListProvider'
import { PageHistory } from './components/PageHistory/PageHistory'
import { ModalProvider } from './providers/ModalProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListProvider>
          <ItemsProvider>
            <ModalProvider>
              <Routes>
                <Route path='/' element={<App />}>
                  <Route path="items" element={<RequiresAuth><Layout/></RequiresAuth>}>
                    <Route index element={<ItemsPage/>}/>
                    <Route path="history" element={<PageHistory />} />
                  </Route>
                  <Route index element={<RedirectOnLogged><LoginPage /></RedirectOnLogged>} />
                </Route>
              </Routes>
            </ModalProvider>
          </ItemsProvider>
        </ListProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
