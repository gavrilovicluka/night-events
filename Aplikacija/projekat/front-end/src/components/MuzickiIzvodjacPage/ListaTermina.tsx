import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import TerminType from "../../types/TerminType";
import DodajTerminIzvodjac from "./DodajTerminIzvodjac";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import { compareAsc } from "date-fns";
import jwtDecode from "jwt-decode";
import { DecodedTokenMuzickiIzvodjac } from "../../types/DecodedTokenMuzickiIzvodjac";
import DogadjajType from "../../types/DogadjajType";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "../../types/DecodedToken";

export default function ListaTermina() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    const token = localStorage.getItem("jwtToken");
    if (token === null || token === undefined) {
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token) as DecodedToken;
    if (decodedToken.role !== "Muzicar") {
      navigate("/");
      return;
    }
  });

  const [termini2, setTermini] = useState<Array<TerminType>>([]);
  const [token, setToken] = useState<string>();
  const [idIzvodjaca, setIdIzvodjaca] = useState<number>();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedTokenMuzickiIzvodjac;
      setToken(token);
      setIdIzvodjaca(decodedToken.id);
    }

    getData(token, idIzvodjaca);
  }, [token, idIzvodjaca]);

  const getData = (
    token: string | null | undefined,
    idIzvodjaca: number | null | undefined
  ) => {
    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }

    axios
      .get(
        ApiConfig.BASE_URL +
          `/MuzickiIzvodjac/VratiListuTermina/${idIzvodjaca}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse<TerminType[]>) => {
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setTermini(data);
        } else {
          console.log("Došlo je do greške prilikom dobavljanja podataka.");
        }
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahteva:", error);
      });
  };

  const handleObrisiTermin = (idIzvodjaca: number | undefined) => {
    axios
      .delete(
        ApiConfig.BASE_URL + `/MuzickiIzvodjac/IzbrisiTermin/${idIzvodjaca}`
      )
      .then((response) => {
        console.log("Termin uspešno obrisan.", response.data);
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom brisanja termina:", error);
      });
  };

  // const handlePrikaziDogadjaj = (idIzvodjaca: number) =>  {
  //   const dogadjaj = dogadjaji.find(dog => dog.izvodjac?.id === idIzvodjaca);

  //   if (dogadjaj) {
  //     const nazivDogadjaja = dogadjaj.naziv;
  //     const nazivKluba = dogadjaj.klub?.naziv;

  //     // Prikazivanje informacija o događaju pomoću alert prozora
  //     alert(`Naziv događaja: ${nazivDogadjaja}\nNaziv kluba: ${nazivKluba}`);
  //   } else {
  //     // Događaj sa datim izvođačem nije pronađen
  //     alert("Događaj nije pronađen.");
  //   }
  // };

  return (
    <>
      <MuzickiIzvodjacHeader />
      <div className="d-flex justify-content-center">
        <div className="col-md-6 col-sm-8 col-xs-10 pt-5">
          <Table className="table-secondary" striped bordered hover>
            <thead>
              <tr>
                <th>Termin</th>
                <th>Rezervisan</th>
                <th>Događaj</th>
                <th>Obriši termin</th>
              </tr>
            </thead>
            <tbody>
              {termini2
                .sort((a, b) =>
                  compareAsc(
                    new Date(a.termin ? a.termin : ""),
                    new Date(b.termin ? b.termin : "")
                  )
                )
                .map((termin, index) => (
                  <tr key={index}>
                    <td>
                      {termin.termin &&
                        new Date(termin.termin).toLocaleDateString("sr-RS")}
                    </td>
                    <td>{termin.rezervisan === true ? "DA" : "NE"}</td>
                    {/* <td><button className="btn btn-primary" onClick={() => handlePrikaziDogadjaj(idIzvodjaca, dogadjaji)}>Prikaži</button></td> */}
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleObrisiTermin(idIzvodjaca)}
                      >
                        Obriši
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>{" "}
    </>
  );
}
