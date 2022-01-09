import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

ReactDOM.render(
  <AppProvider i18n={enTranslations}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>,
  document.getElementById('root')
);