import { ChangeEvent, useEffect, useState } from "react";
import OrganizatorHeader from "./OrganizatorHeader";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import DogadjajType from "../../types/DogadjajType";
import { ApiConfig } from "../../config/api.config";
import jwtDecode from "jwt-decode";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import { string } from "yup";
import { DecodedToken } from "../../types/DecodedToken";
import { useNavigate } from "react-router-dom";



export default function DodajDogadjaj() {
  const [showModal, setShowModal] = useState(false);
  const [datum, setDatum] = useState("");

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
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    setDatum(formattedDate);
  }, []);

  const [dogadjajData, setDogadjajData] = useState({
    naziv: '',
    vreme: '',

  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    if(e.target.name === "datum") {
      const selectedDate = e.target?.value;
      const today = new Date().toISOString().split("T")[0]; 

      if (selectedDate < today) {
        alert("Izabrali ste prošli datum!");
        setDatum(today); // Osvežavanje inputa sa današnjim datumom
      } else {
        setDatum(selectedDate);
      }
    }
    setDogadjajData({ ...dogadjajData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');

    if (token !== null) {

      const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
      console.log(decodedToken);

      const klubId = decodedToken.idKluba;
      const idOrg = decodedToken.id;

      const data = {
        naziv: dogadjajData.naziv,
        datum: datum,
        vreme: dogadjajData.vreme,
      }

      //console.log(dogadjajData.datum);

      axios.post(ApiConfig.BASE_URL + `/Dogadjaj/DodajDogadjajBezIzvodjaca/${klubId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          console.log(response.data);
          setShowModal(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      console.log("Token organizatora nije pronađen.");
    }
  };

  const handleCloseModalMessage = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      <OrganizatorHeader />


      <Container className="pt-4">
        <Col md={{ span: 6, offset: 6 }}></Col>

        <Form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          <Form.Group as={Row} controlId="naziv">
            <Form.Label column sm={2}>Naziv dogadjaja</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" name="naziv" value={dogadjajData.naziv} onChange={handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm={2}>Datum odrzavanja</Form.Label>
            <Col sm={10}>
              <Form.Control type="date" name="datum" value={datum} onChange={handleChange}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="vreme">
            <Form.Label column sm={2}>Vreme odrzavanja</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" name="vreme" value={dogadjajData.vreme} onChange={handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={10} offset={{ sm: 2 }} className="d-flex justify-content-center">
              <Button type="submit" variant="primary">Dodaj dogadjaj</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>

      <Modal show={showModal} onHide={handleCloseModalMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Uspesno dodavanje dogadjaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Dogadjaj je uspesno dodat.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalMessage}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </>


  );

}

