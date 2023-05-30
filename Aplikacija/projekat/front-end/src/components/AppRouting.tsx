import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import { UserRegistrationPage } from "./UserRegistrationPage";
import UserLoginPage from "./UserLoginPage";
import OrganizatorDashboard from "./OrganizatorPage/OrganizatorDashboard";
import ListaIzvodjaca from "./OrganizatorPage/ListaIzvodjaca";
import MuzickiIzvodjacDashboard from "./MuzickiIzvodjacPage/MuzickiIzvodjacDashboard";
import AdministratorDashboard from "./AdministratorPage/AdministratorDashboard";
import DodajTerminIzvodjac from "./MuzickiIzvodjacPage/DodajTerminIzvodjac";
import ListaKlubova from "./AdministratorPage/ListaKlubova";
import ListaOrganizatora from "./AdministratorPage/ListaOrganizatora";
import ListaIzvodjacaAdminPage from "./AdministratorPage/ListaIzvodjacaAdminPage";
import ListaTermina from "./MuzickiIzvodjacPage/ListaTermina";
import ListaDogadjaja from "./OrganizatorPage/ListaDogadjaja";
import DodajDogadjaj from "./OrganizatorPage/DodajDogadjaj";
import DetaljiDogadjaja from "./DetaljiDogadjaja";
import AboutStranica from "./AboutStranica";
import LoginRegisterForm from "./LoginRegisterForm";
import DogadjajType from "../types/DogadjajType";
import PageNotFound from "./PageNotFound";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../types/DecodedToken";
import { ReactNode } from "react";

let userRole: string | null = null;

const token = localStorage.getItem("jwtToken");
if (token !== null) {
  const decodedToken = jwtDecode(token) as DecodedToken;
  userRole = decodedToken.role;
  //console.log(decodedToken);
  console.log(userRole);
} else {
  console.log("Token not found in localStorage");
  console.log(userRole);
}

function AppRouting() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/loginRegister" element={<LoginRegisterForm />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route path="*" element={<PageNotFound />}></Route>
        <Route
          path="/detaljiDogadjaja"
          element={<DetaljiDogadjaja dogadjaj={new DogadjajType()} />}
        />

        <Route path="/AboutStranica" element={<AboutStranica />} />

        <Route
          path="/organizatorDashboard"
          element={
            <OrganizatorElement>
              <OrganizatorDashboard />
            </OrganizatorElement>
          }
        />
        <Route
          path="/organizatorDashboard/mojiDogadjaji"
          element={
            <OrganizatorElement>
              <ListaDogadjaja />
            </OrganizatorElement>
          }
        />
        <Route
          path="/organizatorDashboard/dodajDogadjaj"
          element={
            <OrganizatorElement>
              <DodajDogadjaj />
            </OrganizatorElement>
          }
        />
        <Route
          path="/organizatorDashboard/pregledIzvodjaca"
          element={
            <OrganizatorElement>
              <ListaIzvodjaca />
            </OrganizatorElement>
          }
        />


        <Route
          path="/muzickiIzvodjacDashboard"
          element={
            <MuzicarElement>
              <MuzickiIzvodjacDashboard />
            </MuzicarElement>
          }
        />
        <Route
          path="/muzickiIzvodjacDashboard/mojiTermini"
          element={
            <MuzicarElement>
              <ListaTermina />
            </MuzicarElement>
          }
        />
        <Route
          path="/muzickiIzvodjacDashboard/dodajTermin"
          element={
            <MuzicarElement>
              <DodajTerminIzvodjac />
            </MuzicarElement>
          }
        />


        <Route
          path="/administratorDashboard"
          element={
            <AdminElement>
              <AdministratorDashboard />
            </AdminElement>
          }
        />
        <Route
          path="/administratorDashboard/klubovi"
          element={
            <AdminElement>
              <ListaKlubova />
            </AdminElement>
          }
        />
        <Route
          path="/administratorDashboard/ogranizatori"
          element={
            <AdminElement>
              <ListaOrganizatora />
            </AdminElement>
          }
        />
        <Route
          path="/administratorDashboard/muzickiIzvodjaci"
          element={
            <AdminElement>
              <ListaIzvodjacaAdminPage />
            </AdminElement>
          }
        />
        
      </Routes>
    </>
  );
}

const AdminElement = ({ children }: { children: ReactNode }) => {
  if (userRole === "Admin") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

const OrganizatorElement = ({ children }: { children: ReactNode }) => {
  if (userRole === "Organizator") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

const MuzicarElement = ({ children }: { children: ReactNode }) => {
  if (userRole === "Muzicar") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

const KorisnikElement = ({ children }: { children: ReactNode }) => {
  if (userRole === "Korisnik") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default AppRouting;
