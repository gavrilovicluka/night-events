import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { MainMenuItem } from './components/MainMenu';
import { BrowserRouter} from 'react-router-dom';
import AppRouting from './components/AppRouting';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouting />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
