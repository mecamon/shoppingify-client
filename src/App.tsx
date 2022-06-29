import { Link, Outlet } from 'react-router-dom'
import './App.css'
import i18n from "i18next"
import { useTranslation, initReactI18next } from "react-i18next"
import english from './i18n/en.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthHandler from './providers/AuthHandler'


i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: english
    },
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

function App() {
  return (
    <div className="App relative">
      <AuthHandler>
        <Outlet />
      </AuthHandler>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <ToastContainer />
    </div>
  )
}

export default App
