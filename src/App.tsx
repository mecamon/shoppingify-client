import { Link, Outlet } from 'react-router-dom';
import './App.css'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import english from './i18n/en.json'
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
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App
