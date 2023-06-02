import { ChangeEvent, useEffect, useState } from "react";
import OrganizatorHeader from "./OrganizatorHeader";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import DogadjajType from "../../types/DogadjajType";
import { ApiConfig } from "../../config/api.config";
import jwtDecode from "jwt-decode";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import { string } from "yup";
import { DecodedToken } from "../../types/DecodedToken";
import { useNavigate } from "react-router-dom";



export default function DodajDogadjaj() {
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

  const [dogadjajData, setDogadjajData] = useState({
    naziv: '',
    datum: '',
    vreme: '',

  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        datum: dogadjajData.datum,
        vreme: dogadjajData.vreme,
      }

      //console.log(dogadjajData.datum);

      axios.post(ApiConfig.BASE_URL + `/Dogadjaj/DodajDogadjajBezIzvodjaca/${klubId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      console.log("Token organizatora nije pronađen.");
    }
  };

  return (
    <>
      <OrganizatorHeader />


      <Container>
        <Col md={{ span: 6, offset: 6 }}></Col>

        <Form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          {/* <Form.Group as={Row} controlId="idOrganizatora">
        <Form.Label column sm={2}>ID organizatora</Form.Label>
        <Col sm={10}>
          <Form.Control type="text" name="idOrganizatora" value={orgID} onChange={handleChange} readOnly />
        </Col>
      </Form.Group> */}
          <Form.Group as={Row} controlId="naziv">
            <Form.Label column sm={2}>Naziv dogadjaja</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" name="naziv" value={dogadjajData.naziv} onChange={handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm={2}>Datum odrzavanja</Form.Label>
            <Col sm={10}>
              <Form.Control type="date" name="datum" value={dogadjajData.datum} onChange={handleChange} />
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

        {/* <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          <div className="form-group row">
            <label htmlFor="idOrganizatora" className="col-sm-2 col-form-label">ID organizatora</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="idOrganizatora" name="idOrganizatora" value={dogadjajData.id} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="naziv" className="col-sm-2 col-form-label">Naziv dogadjaja</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="naziv" name="naziv" value={dogadjajData.naziv} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="datumIVreme" className="col-sm-2 col-form-label">Datum i vreme odrzavanja</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="datumIVreme" name="datumIVreme" value={dogadjajData.datumIVreme} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group row">
          <div className="col-sm-10 offset-sm-2 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Dodaj dogadjaj</button>
            </div>
          </div>
        </form> */}
      </Container>
    </>


  );

}

