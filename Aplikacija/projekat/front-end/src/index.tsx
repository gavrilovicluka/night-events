import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './components/HomePage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { MainMenu, MainMenuItem } from './components/MainMenu';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { UserRegistrationPage } from './components/UserRegistrationPage';
import UserLoginPage from './components/UserLoginPage';
import OrganizatorDashboard from './components/OrganizatorDashboard';
import ListaIzvodjaca from './components/ListaIzvodjaca';
import MuzickiIzvodjacDashboard from './components/MuzickiIzvodjacDashboard';

const menuItems = [
  new MainMenuItem("Home", "/"),
  new MainMenuItem("Login", "/login/"),
  new MainMenuItem("Register", "/register/"),

]

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <MainMenu items = {menuItems}></MainMenu> */}
    <HashRouter>
      <Routes>
        {/* <Route path='/' element={ <HomePage/> } />  */}
        <Route path='/login' element={ <UserLoginPage/> } /> 
        <Route path='/register' element={ <UserRegistrationPage/> } /> 
        <Route path='/organizatorDashboard' element={ <OrganizatorDashboard/> } /> 
        <Route path='/muzickiIzvodjacDashboard' element={ <MuzickiIzvodjacDashboard/> } /> 
        <Route path='/lista-izvodjaca' element={ <ListaIzvodjaca/> } /> 
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
