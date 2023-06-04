import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import DogadjajType from "../types/DogadjajType";
import HomePageNavbar from "./HomePageNavbar";
import KlubInfo from "./KlubInfo";
import KlubType from "../types/KlubType";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ApiConfig } from "../config/api.config";
import StoType from "../types/StoType";

function DogadjajPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dogadjaj, setDogadjaj] = useState<DogadjajType>();
  const [show, setShow] = useState(false);
  const [showModalRezervacija, setShowModalRezervacija] = useState(false);
  const [selectedStoId, setSelectedStoId] = useState<number | null>(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const vrsteStolova = [
    { vrsta: "Barski sto", id: 1 },
    { vrsta: "Visoko sedenje", id: 2 },
    { vrsta: "Separe", id: 3 },
  ];

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = (id: string | undefined) => {
    if (id === undefined) {
      console.log("ID dogadjaja je undefined");
      return;
    }
    const parsedId = parseInt(id);

    axios
      .get(ApiConfig.BASE_URL + `/Dogadjaj/VratiDogadjaj/${parsedId}`)
      .then((response: AxiosResponse<DogadjajType[]>) => {
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setDogadjaj(data[0]);
        } else {
          console.log("Došlo je do greške prilikom dobavljanja podataka.");
        }
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahteva:", error);
      });
  };

  const handleRezervisi = () => {
    if (isLoggedIn) {
      //!!!!!!!!!!
      setShow(true);
    } else {
      setShowModalRezervacija(true);
      //vrsenje rezervacije
    }
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleStoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStoId(event.target.value ? parseInt(event.target.value) : null);

    if (event.target.value == null) {
      alert("Morate izabrati sto!");
      return;
    }
  };

  const confirmRezervisi = () => {
    if (selectedStoId) {
    }
  };

  console.log(dogadjaj);
  return (
    <>
      {" "}
      <HomePageNavbar />
      <Container>
        <Row className="mt-4">
          <Col md={6} className="mb-4">
            <div
              className="bg-secondary rounded p-4"
              style={{ height: "300px" }}
            >
              <KlubInfo klub={dogadjaj?.klub as KlubType} />
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div
              className="bg-secondary rounded p-4"
              style={{ height: "300px" }}
            >
              <h2 className="text-center">{dogadjaj?.naziv}</h2>
              <p>
                <strong> Datum: </strong>{" "}
                {dogadjaj?.datum &&
                  new Date(dogadjaj?.datum).toLocaleDateString("sr-RS")}
              </p>
              <p>
                <strong> Vreme: </strong> {dogadjaj?.vreme}
              </p>
              <p>
                <strong> Muzički izvođač: </strong>{" "}
                {dogadjaj?.izvodjac?.imeIzvodjaca}
              </p>
              <p>
                <strong> Žanr: </strong> {dogadjaj?.izvodjac?.zanr}
              </p>
              <Button
                className="btn btn-primary"
                onClick={() => {
                  handleRezervisi();
                }}
              >
                Rezerviši
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <div className="bg-secondary rounded p-4">
              <h2>Mapa/Lokacija</h2>
              <div style={{ width: "90%" }}>
                {/* Ovdje možete dodati komponentu za prikaz mape ili lokacije */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ne mozete izvrsiti rezervaciju</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Morate biti prijavljeni na svoj nalog da biste izvrsili rezervaciju!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showModalRezervacija}
        onHide={() => setShowModalRezervacija(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rezervacija</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="text-center mb-3">
        <img src={`../../assets/klub.jpg`} alt="Mapa kluba" style={{ width: "100%" }}/>     {/* ${dogadjaj?.klub?.mapaKluba} */} 
          </div>
          <Form.Select
            className="mb-3"
            value={selectedStoId !== null ? selectedStoId.toString() : ""}
            onChange={handleStoChange}
          >
            <option value="">Izaberite sto</option>
            {vrsteStolova.map((vrstaStola) => {

              let sviStoloviJedneVrsteRezervisani = false;
              dogadjaj?.stolovi?.forEach((sto) => {
                if(sto.vrstaStola === vrstaStola.vrsta) {
                  if(sto.status === 0) {
                    sviStoloviJedneVrsteRezervisani = true;
                  }
                }
              })

              return (
                <option
                  key={vrstaStola.id}
                  value={vrstaStola.id}
                  disabled={sviStoloviJedneVrsteRezervisani}
                >
                  {vrstaStola.vrsta}
                </option>
              );
            })}
          </Form.Select>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={confirmRezervisi}>
              Potvrdi
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DogadjajPage;
