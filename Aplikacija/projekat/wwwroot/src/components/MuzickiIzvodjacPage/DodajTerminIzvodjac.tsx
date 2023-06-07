import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import { ApiConfig } from "../../config/api.config";
import { Button, Form, Modal } from "react-bootstrap";
import { DecodedTokenMuzickiIzvodjac } from "../../types/DecodedTokenMuzickiIzvodjac";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "../../types/DecodedToken";

function DodajTerminIzvodjac() {
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

  const [datum, setDatum] = useState("");
  const [idIzvodjaca, setIdIzvodjaca] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    setDatum(formattedDate);
  }, []);

  const data = {
    datum: datum,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    if (token !== null) {
      const decodedToken = jwtDecode(token) as
        | DecodedTokenMuzickiIzvodjac
        | DecodedTokenOrganizator;
      console.log(decodedToken);

      if ("id" in decodedToken) {
        const idMuz = decodedToken.id;

        try {
          const today = new Date().toISOString().split("T")[0]; 

          if (datum < today) {
            alert("Izabrali ste prošli datum!");
            return; 
          }
          console.log(datum);
          const response = await axios.post(
            ApiConfig.BASE_URL +
              `/MuzickiIzvodjac/PostaviSlobodanTermin/${idMuz}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            const data = response.data;
            setShowModal(true);
          } else {
            // Dodatna logika za obradu neuspešnog odgovora
          }
        } catch (error) {
          console.error("Greška prilikom poziva API funkcije:", error);
        }
      } else {
        console.log("Token nije pridružen muzičkom izvođaču.");
      }
    } else {
      console.log("Token organizatora nije pronađen.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload(); 
  };

  const handleDatumChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const today = new Date().toISOString().split("T")[0]; 

    if (selectedDate < today) {
      alert("Izabrali ste prošli datum!");
      setDatum(today); 
    } else {
      setDatum(selectedDate);
    }
  };

  const handleIdIzvodjacaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdIzvodjaca(event.target.value);
  };

  return (
    <>
      {/* <MuzickiIzvodjacHeader /> */}

      <div className="d-flex justify-content-center ">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                placeholder="Unesite datum"
                value={datum}
                onChange={handleDatumChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Dodaj termin
            </Button>
          </Form>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Uspešno dodavanje termina</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Termin je uspešno dodat.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DodajTerminIzvodjac;
