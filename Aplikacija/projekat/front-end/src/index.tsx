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
import OrganizatorDashboard from './components/OrganizatorPage/OrganizatorDashboard';
import ListaIzvodjaca from './components/OrganizatorPage/ListaIzvodjaca';
import MuzickiIzvodjacDashboard from './components/MuzickiIzvodjacPage/MuzickiIzvodjacDashboard';
import AdministratorDashboard from './components/AdministratorPage/AdministratorDashboard';
import DodajTerminIzvodjac from './components/MuzickiIzvodjacPage/DodajTerminIzvodjac';
import ListaKlubova from './components/AdministratorPage/ListaKlubova';
import ListaOrganizatora from './components/AdministratorPage/ListaOrganizatora';
import ListaIzvodjacaAdminPage from './components/AdministratorPage/ListaIzvodjacaAdminPage';
import ListaTermina from './components/MuzickiIzvodjacPage/ListaTermina';
import ListaDogadjaja from './components/OrganizatorPage/ListaDogadjaja';
import DodajDogadjaj from './components/OrganizatorPage/DodajDogadjaj';
import DetaljiDogadjaja from './components/DetaljiDogadjaja';
import DogadjajType from './types/DogadjajType';
import AboutStranica from './components/AboutStranica';

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
        <Route path='/' element={ <HomePage/> } /> 
        <Route path='/login' element={ <UserLoginPage/> } /> 
        <Route path='/register' element={ <UserRegistrationPage/> } /> 

        <Route path='/organizatorDashboard' element={ <OrganizatorDashboard/> } /> 
        <Route path='/organizatorDashboard/mojiDogadjaji' element={ <ListaDogadjaja /> } /> 
        <Route path='/organizatorDashboard/dodajDogadjaj' element={ <DodajDogadjaj /> } />
        <Route path='/organizatorDashboard/pregledIzvodjaca' element={ <ListaIzvodjaca/> } /> 

        <Route path='/muzickiIzvodjacDashboard' element={ <MuzickiIzvodjacDashboard/> } />        
        <Route path='/muzickiIzvodjacDashboard/mojiTermini' element={ <ListaTermina/> } /> 
        <Route path='/muzickiIzvodjacDashboard/dodajTermin' element={ <DodajTerminIzvodjac/> } /> 
        
        <Route path='/administratorDashboard' element={ <AdministratorDashboard/> } />
        <Route path='/administratorDashboard/klubovi' element={ <ListaKlubova/> } />
        <Route path='/administratorDashboard/ogranizatori' element={ <ListaOrganizatora/> } />
        <Route path='/administratorDashboard/muzickiIzvodjaci' element={ <ListaIzvodjacaAdminPage/> } />

        <Route path='/detaljiDogadjaja' element={ <DetaljiDogadjaja dogadjaj={ new DogadjajType}/> } />

        <Route path='/AboutStranica' element={ <AboutStranica/> } />
    
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
