import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import TerminType from "../../types/TerminType";
import { ApiConfig } from "../../config/api.config";
import { Button, Modal, Table } from "react-bootstrap";
import { compareAsc } from "date-fns";
import jwtDecode from "jwt-decode";
import { DecodedTokenMuzickiIzvodjac } from "../../types/DecodedTokenMuzickiIzvodjac";
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
  const [selectedTermin, setSelectedTermin] = useState<TerminType| null>(null);

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

  const handlePrikaziDogadjaj = (termin: TerminType) => {
    if (termin.rezervisan) {
      setSelectedTermin(termin);
      //setSelectedDogadjaj(termin.dogadjaj)
    }
    console.log(termin.dogadjaj![0].naziv)
  };
 
  

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
                      {termin.termin
                      ? new Date(termin.termin).toLocaleDateString("sr-RS")
                      : "N/A"}
                    </td>
                    <td>{termin.rezervisan === true ? "DA" : "NE"}</td>
                    {termin.rezervisan ? (
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handlePrikaziDogadjaj(termin)}
                          >
                            Prikaži
                          </button>
                        </td>
                      ) : (
                        <td>
                          <button
                            className="btn btn-primary"
                             disabled
                          >
                            Prikaži
                          </button>
                        </td>
                      )}                    
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>{" "}
      
      {selectedTermin?.rezervisan && (
  <Modal show={true} onHide={() => setSelectedTermin(null)}>
    <Modal.Header closeButton>
      <Modal.Title>Informacije o događaju</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p> <strong>Naziv dogadjaja:</strong> {selectedTermin.dogadjaj![0].naziv}</p>
      <p> <strong>Naziv kluba:</strong> {selectedTermin.dogadjaj![0].klub?.naziv}</p>
      <p> <strong>Ime i prezime organizatora:</strong> {selectedTermin.dogadjaj![0].organizator?.ime} {selectedTermin.dogadjaj![0].organizator?.prezime}</p>
      <p> <strong>Kontakt mejl organizatora:</strong> {selectedTermin.dogadjaj![0].organizator?.email} </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setSelectedTermin(null)}>
        Zatvori
      </Button>
    </Modal.Footer>
  </Modal>
)}

    </>
  );
}
