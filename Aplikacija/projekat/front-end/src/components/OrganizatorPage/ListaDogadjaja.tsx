import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import OrganizatorHeader from "./OrganizatorHeader";
import DogadjajType from "../../types/DogadjajType";
import { ApiConfig } from "../../config/api.config";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { compareAsc } from "date-fns";
import jwtDecode from "jwt-decode";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import { DecodedToken } from "../../types/DecodedToken";
import { useNavigate } from "react-router-dom";

export default function ListaDogadjaja() {
  const [dogadjaji, setDogadjaji] = useState<Array<DogadjajType>>([]);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalRezervacije, setShowModalRezervacije] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDogadjajId, setSelectedDogadjajId] = useState<number>(0);
  const [selectedDogadjaj, setSelectedDogadjaj] = useState<DogadjajType>();
  const [selectedDate, setSelectedDate] = useState<Date>();

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
    if (decodedToken.role !== "Organizator") {
      navigate("/");
      return;
    }
  });
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      const decoded = jwtDecode(storedToken) as DecodedTokenOrganizator;

      axios
        .get(
          ApiConfig.BASE_URL +
            `/Dogadjaj/VratiDogadjajeKluba/${decoded.idKluba}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        .then((response: AxiosResponse<DogadjajType[]>) => {
          if (response.status === 200) {
            const data = response.data;
            console.log(data);
            setDogadjaji(data);
          } else {
            console.log("Došlo je do greške prilikom dobavljanja podataka.");
          }
        })
        .catch((error) => {
          console.log("Došlo je do greške prilikom slanja zahteva:", error);
        });
    }
  };
  const handleDodeliIzvodjaca = (dogadjajId: number, datum: Date) => {
    setSelectedDogadjajId(dogadjajId);
    setSelectedDate(datum);
    setShowForm(true);
  };

  const IzborIzvodjacaForma = ({ idDogadjaja, datum }: { idDogadjaja: number, datum?: Date }) => {
    const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);
    const [selectedIzvodjac, setSelectedIzvodjac] =
      useState<MuzickiIzvodjacType>();

    useEffect(() => {
      const fetchIzvodjaci = async () => {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
          try {
            const response = await axios.get(
              ApiConfig.BASE_URL + "/MuzickiIzvodjac/VratiSlobodneMuzickeIzvodjaceZaDatum", {
                params: {
                  datum: selectedDate?.toString().split('T')[0]
                },
                
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            );
            if (response.status === 200) {
              setIzvodjaci(response.data);
            } else {
              // Dodatna logika za obradu neuspesnog odgovora
            }
          } catch (error) {
            console.error("Greska prilikom poziva API funkcije:", error);
          }
        }
      };
      
      fetchIzvodjaci();
    }, []);

    const handleOdabirIzvodjaca = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = parseInt(e.target.value);
      const izvodjac = izvodjaci.find((izvodjac) => izvodjac.id === selectedId);
      setSelectedIzvodjac(izvodjac);
    };

    const handlePotvrda = async () => {
      if(selectedIzvodjac === null || selectedIzvodjac === undefined) {
        alert("Morate izabrati muzickog izvodjaca");
        return;
      }
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        try {
          const response = await axios.put(
            ApiConfig.BASE_URL +
              `/Dogadjaj/DodeliIzvodjaca/${idDogadjaja}/${selectedIzvodjac?.id}`, {},
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              }
            }
          );

          if (response.status === 200) {
            const data = response.data;
            setShowModalMessage(true);
          } else {
            // Dodatna logika za obradu neuspesnog odgovora
          }
        } catch (error) {
          console.error("Greska prilikom poziva API funkcije:", error);
        }
      }
    };

    const handleOdustani = () => {
      setShowForm(false);
      setSelectedIzvodjac(undefined);
    };

    return (
      <>
        <Modal show={true} onHide={handleOdustani}>
          <Modal.Header closeButton>
            <Modal.Title>Odaberi izvođača za dogadjaj</Modal.Title>
          </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group controlId="izvodjacSelect" className="centered-group">
                  <Form.Label>Odaberi izvođača: </Form.Label>
                  <select
                  className="centered-dropdown"
                    value={selectedIzvodjac?.id || ""}
                    onChange={handleOdabirIzvodjaca}
                  >
                    <option value="">Odaberi izvođača </option>
                    {izvodjaci.map((izvodjac) => (
                      <option key={izvodjac.id} value={izvodjac.id}>
                        {izvodjac.imeIzvodjaca}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Form>
            </Modal.Body>


          <Modal.Footer>
            <Button variant="secondary" onClick={handleOdustani}>
              Odustani
            </Button>
            <Button variant="primary" onClick={handlePotvrda}>
              Potvrdi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const handleCloseModalMessage = () => {
    setShowModalMessage(false);
    window.location.reload();
  };

  const handlePrikaziRezervacije = (dogadjaj: DogadjajType) => {
    setSelectedDogadjaj(dogadjaj);
    setShowModalRezervacije(true);
    console.log(dogadjaj.rezervacije);
  };

  return (
    <>
      <OrganizatorHeader />
      <div className="d-flex justify-content-center">
        <Table className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Muz. izvodjac</th>
              <th>Broj rezervacija</th>
              <th>Rezervacije</th>
            </tr>
          </thead>
          <tbody>
            {dogadjaji
              .sort((a, b) =>
                compareAsc(
                  new Date(a.datum ? a.datum : ""),
                  new Date(b.datum ? b.datum : "")
                )
              )
              .map((dogadjaj, index) => (
                <tr key={index}>
                  <td>{dogadjaj.id}</td>
                  <td>{dogadjaj.naziv}</td>
                  <td>
                    {dogadjaj.datum &&
                      new Date(dogadjaj.datum).toLocaleDateString("sr-RS")}
                  </td>
                  <td>{dogadjaj.vreme}</td>
                  <td>
                    {dogadjaj.izvodjac ? (
                      dogadjaj.izvodjac.imeIzvodjaca
                    ) : (
                      <>
                        {showForm && selectedDogadjajId === dogadjaj.id ? (
                          <IzborIzvodjacaForma
                            idDogadjaja={selectedDogadjajId}
                            datum={selectedDate}
                          />
                        ) : (
                          <Button
                            onClick={() => handleDodeliIzvodjaca(dogadjaj.id!, dogadjaj.datum!)}
                          >
                            Dodaj izvođača
                          </Button>
                        )}
                      </>
                    )}
                  </td>
                  <td>{dogadjaj.brojRezervacija}</td>
                  <td>
                    <Button onClick={() => handlePrikaziRezervacije(dogadjaj)}>
                      Prikazi
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModalMessage} onHide={handleCloseModalMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Uspesno dodavanje izvodjaca za dogadjaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Muzicki izvodjac je uspesno angazovan.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalMessage}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <Modal
        show={showModalRezervacije}
        onHide={() => setShowModalRezervacije(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rezervacije za događaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDogadjaj && (
            <div>
              <h4 style={{ textAlign: "center" }}>{selectedDogadjaj.naziv}</h4>
              {selectedDogadjaj.rezervacije !== null ? (
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Datum rezervacije</th>
                      <th>Username korisnika</th>
                      <th>Ime i prezime korisnika</th>
                      <th>Vrsta stola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDogadjaj.rezervacije!.map((rezervacija, index) => (
                      <tr key={index}>
                        <td>{rezervacija.id}</td>
                        <td>
                        {rezervacija.datum &&
                      new Date(rezervacija.datum).toLocaleDateString("sr-RS")}
                        </td>
                        <td>{rezervacija.korisnik?.username}</td>
                        <td>{rezervacija.korisnik?.ime} {rezervacija.korisnik?.prezime} </td>
                        <td>{rezervacija.sto?.vrstaStola}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Nema rezervacija za ovaj događaj.</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModalRezervacije(false)}
          >
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
