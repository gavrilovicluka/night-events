import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ApiConfig } from "../../config/api.config";
import DogadjajType from "../../types/DogadjajType";
import OrganizatorHeader from "./OrganizatorHeader";
import KlubType from "../../types/KlubType";
import OrganizatorType from "../../types/OrganizatorType";
import jwtDecode from "jwt-decode";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";


export default function MojKlub() {


  const [selectedKlub, setselectedKlub] = useState<KlubType>();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getData();
  }, []);


  const getData = () => {
    // Dobijanje tokena organizatora iz lokalnog skladišta (localStorage ili slično)
    const token = localStorage.getItem('jwtToken');

    if (token !== null) {
      // Dekodiranje tokena kako biste dobili informacije o organizatoru
      const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
      console.log(decodedToken);

      // Dobijanje ID kluba iz dekodiranog tokena
      const klubId = decodedToken.idKluba;
      console.log(klubId);

      // Pozivanje API funkcije VratiKlub sa prosleđenim ID-jem kluba
      axios.get(ApiConfig.BASE_URL + `/Klub/VratiKlub/${klubId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response: AxiosResponse<KlubType>) => {
          if (response.status === 200) {
            const klubData = response.data;
            console.log(klubData);
            setselectedKlub(klubData);
          } else {
            console.log("Došlo je do greške prilikom dobavljanja podataka o klubu.");
          }
        })
        .catch((error) => {
          console.log("Došlo je do greške prilikom slanja zahteva za klub:", error);
        });
    } else {
      console.log("Token organizatora nije pronađen.");
    }
  }

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {

    const token = localStorage.getItem('jwtToken');

    console.log(selectedKlub);

    const updatedKlub = {
      ...selectedKlub,
      lokacija: selectedKlub?.lokacija,
      brojStolovaBS: selectedKlub?.brojStolovaBS,
      brojStolovaVS: selectedKlub?.brojStolovaVS,
      brojStolovaS: selectedKlub?.brojStolovaS,
    };

    if (token !== null) {
      // Dekodiranje tokena kako biste dobili informacije o organizatoru
      const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
      console.log(decodedToken);

      // Dobijanje ID kluba iz dekodiranog tokena
      const klubId = decodedToken.idKluba;
      console.log(klubId);



      axios.put(ApiConfig.BASE_URL + `/Klub/IzmeniKlub`, updatedKlub, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setselectedKlub(updatedKlub);
            setIsEditing(false);
          } else {
            console.log("Došlo je do greške prilikom ažuriranja podataka o klubu.");
          }
        })
        .catch((error) => {
          console.log("Došlo je do greške prilikom slanja zahteva za ažuriranje kluba:", error);
        });
    }
  };


  return (
    <>
      <OrganizatorHeader />
      <Container>
        {selectedKlub && (
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src={selectedKlub.slikaKluba} alt="Slika kluba" />
                <Card.Body>
                  <Card.Title>{selectedKlub.naziv}</Card.Title>
                  <Form>
                    <Form.Group controlId="lokacija">
                      <Form.Control
                        type="text"
                        value={selectedKlub.lokacija}
                        readOnly={!isEditing}
                        onChange={(e) => setselectedKlub({ ...selectedKlub, lokacija: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="brojStolovaBS">
                      <Form.Label>Broj stolova BS</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.brojStolovaBS?.toString()}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            brojStolovaBS: parseInt(e.target.value)
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="brojStolovaVS">
                      <Form.Label>Broj stolova VS</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.brojStolovaVS?.toString()}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            brojStolovaVS: parseInt(e.target.value)
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="brojStolovaS">
                      <Form.Label>Broj stolova S</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.brojStolovaS?.toString()}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            brojStolovaS: parseInt(e.target.value)
                          })
                        }
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={isEditing ? handleSaveChanges : handleButtonClick}>
                      {isEditing ? 'Sačuvaj' : 'Izmeni'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}