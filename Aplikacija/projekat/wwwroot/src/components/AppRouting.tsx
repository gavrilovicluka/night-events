import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./HomePage";
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
import AboutStranica from "./AboutStranica";
import LoginRegisterForm from "./LoginRegisterForm";
import ContactStranica from "./ContactStranica";
import DogadjajType from "../types/DogadjajType";
import PageNotFound from "./PageNotFound";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../types/DecodedToken";
import { ReactNode, useEffect, useState } from "react";
import MojKlub from "./OrganizatorPage/MojKlub";
import DogadjajPage from "./DogadjajPage";

function AppRouting() {
  let userRole: string | null = null;

  const AdminElement = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      userRole = decodedToken.role;
    } else {
      console.log("Token not found in localStorage");
      userRole = null;
    }

    if (userRole === "Admin") {
      return <>{children}</>;
    } else if (userRole === "Organizator") {
      return <Navigate to={"/organizatorDashboard/mojKlub"} />;
    } else if (userRole === "Muzicar") {
      return <Navigate to={"/muzickiIzvodjacDashboard/mojiTermini"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  const OrganizatorElement = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      userRole = decodedToken.role;
    } else {
      console.log("Token not found in localStorage");
      userRole = null;
    }

    if (userRole === "Organizator") {
      return <>{children}</>;
    } else if (userRole === "Admin") {
      return <Navigate to={"/administratorDashboard/klubovi"} />;
    } else if (userRole === "Muzicar") {
      return <Navigate to={"/muzickiIzvodjacDashboard/mojiTermini"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  const MuzicarElement = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      userRole = decodedToken.role;
    } else {
      console.log("Token not found in localStorage");
      userRole = null;
    }

    if (userRole === "Muzicar") {
      return <>{children}</>;
    } else if (userRole === "Admin") {
      return <Navigate to={"/administratorDashboard/klubovi"} />;
    } else if (userRole === "Organizator") {
      return <Navigate to={"/organizatorDashboard/mojKlub"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  const KorisnikElement = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      userRole = decodedToken.role;
    } else {
      console.log("Token not found in localStorage");
      userRole = null;
    }
    console.log(userRole);
    if (userRole === "Korisnik" || userRole === null) {
      return <>{children}</>;
    } else if (userRole === "Admin") {
      return <Navigate to={"/administratorDashboard/klubovi"} />;
    } else if (userRole === "Organizator") {
      return <Navigate to={"/organizatorDashboard/mojKlub"} />;
    } else if (userRole === "Muzicar") {
      return <Navigate to={"/muzickiIzvodjacDashboard/mojiTermini"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <KorisnikElement>
              {" "}
              <HomePage />{" "}
            </KorisnikElement>
          }
        />
        <Route
          path="/loginRegister"
          element={
            <LoginRegisterForm
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route path="*" element={<PageNotFound />}></Route>
        <Route
          path="/detaljiDogadjaja/:id"
          element={
            <KorisnikElement>
              {" "}
              <DogadjajPage />{" "}
            </KorisnikElement>
          }
        />

        <Route
          path="/AboutStranica"
          element={
            <KorisnikElement>
              {" "}
              <AboutStranica />{" "}
            </KorisnikElement>
          }
        />
        <Route
          path="/ContactStranica"
          element={
            <KorisnikElement>
              {" "}
              <ContactStranica />{" "}
            </KorisnikElement>
          }
        />

        {/* <Route
          path="/organizatorDashboard"
          element={
            <OrganizatorElement>
              <OrganizatorDashboard />
            </OrganizatorElement>
          }
        /> */}
        <Route
          path="/organizatorDashboard/mojKlub"
          element={
            <OrganizatorElement>
              <MojKlub />
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

        {/* <Route
          path="/muzickiIzvodjacDashboard"
          element={
            <MuzicarElement>
              <MuzickiIzvodjacDashboard />
            </MuzicarElement>
          }
        /> */}
        <Route
          path="/muzickiIzvodjacDashboard/mojiTermini"
          element={
            <MuzicarElement>
              <ListaTermina />
            </MuzicarElement>
          }
        />
        {/* <Route
          path="/muzickiIzvodjacDashboard/dodajTermin"
          element={
            <MuzicarElement>
              <DodajTerminIzvodjac />
            </MuzicarElement>
          }
        /> */}

        {/* <Route
          path="/administratorDashboard"
          element={
            <AdminElement>
              <AdministratorDashboard />
            </AdminElement>
          }
        /> */}
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

export default AppRouting;
