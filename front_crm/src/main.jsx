import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import tEn from '../Translation/tEn.json'
import tSp from '../Translation/tSp.json'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import dotenv from 'dotenv';

if (typeof process !== 'undefined') {
  dotenv.config();
}


i18n
  .use(initReactI18next)
  .init({

    resources: {
      en: {
        translation: tEn
      },
      sp: {
        translation: tSp
      }
    },
    lng: "sp",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>

      <App />
    </Provider>
  </React.StrictMode>
);
