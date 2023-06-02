import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import KlubType from "../../types/KlubType";
import AdministratorHeader from "./AdministratorHeader";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { ApiConfig } from "../../config/api.config";
import OcenaKlubType from "../../types/OcenaKlubType";



export default function ListaKlubova() {


  const [showModal, setShowModal] = useState(false);
  const [klubData, setKlubData] = useState({
    idOrganizatora: '',
    naziv: '',
    lokacija: '',
    brojStolovaBS: '',
    brojStolovaVS: '',
    brojStolovaS: ''
  });

  const [imageSlika, setImageSlika] = useState('');
  const [imageMapa, setImageMapa] = useState('');

  function handleImageSlika(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      console.log(imageUrl);
      setImageSlika(imageUrl);
    }
  }

  function handleImageMapa(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      console.log(imageUrl);
      setImageMapa(imageUrl);
    }
  }



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKlubData({ ...klubData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      slikaKluba: imageSlika,
      mapaKluba: imageMapa
    }

    e.preventDefault();

    axios.post(ApiConfig.BASE_URL + `/Klub/DodajKlub/${klubData.idOrganizatora}/${klubData.naziv}/${klubData.lokacija}/${klubData.brojStolovaBS}/${klubData.brojStolovaVS}/${klubData.brojStolovaS}`, formData)
      .then((response) => {
        console.log(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [klubovi, setKlubovi] = useState<Array<KlubType>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

    axios.get(ApiConfig.BASE_URL + "/Klub/VratiKlubove")
      .then((response: AxiosResponse<KlubType[]>) => {
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setKlubovi(data);
        } else {
          console.log("Došlo je do greške prilikom dobavljanja podataka.");
        }
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahteva:", error);
      });
  }


  function izracunajProsek(ocene: OcenaKlubType[] | null | undefined) {
    if (!ocene || ocene.length === 0) {
      return 0; 
    }

    var oceneBezNula = ocene
      .filter(function (ocena) {
        return ocena.ocena !== 0; // Filtriraj nule iz niza ocena
      })
      .map(function (ocena) {
        return ocena.ocena; // Izvuci vrednosti ocena iz objekata
      });

    if (oceneBezNula.length === 0) {
      return 0; // Ako su sve ocene nule, prosečna ocena je 0
    }

    var sum = oceneBezNula.reduce(function (a, b) {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b; // Saberi samo ako su a i b brojevi
      } else {
        return (a || 0) + (b || 0); // Ako su a ili b undefined, koristi 0
      }
    }, 0); // Inicijalna vrednost za sum je 0

    if (typeof sum !== 'number') {
      return 0; // Ako sum nije broj, vrati 0
    }


    var prosek = sum / oceneBezNula.length;
    return prosek;
  }


  const handleBrisanje = (index: number) => {
    const confirmed = window.confirm("Da li želite da obrišete klub?");
    if (confirmed) {
    const updatedKlubovi = [...klubovi];
    const idKluba = updatedKlubovi[index].id;
  
    axios
      .delete(ApiConfig.BASE_URL + `/Administrator/ObrisiKlub/${idKluba}`)
      .then((response) => {
        console.log(response.data);
        updatedKlubovi.splice(index, 1);
        setKlubovi(updatedKlubovi);
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahteva:", error);
    
      });
    }
  };

  return (
    <>
      <AdministratorHeader />

      <div style={{ height: '20px' }}></div>


      <Container className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          <Row className="mb-4">
            <Col sm={6} className="d-flex flex-column justify-content-start">
              <Form.Group controlId="idOrganizatora" className="row">
                <Form.Label column sm={4} className="text-end">ID organizatora</Form.Label>
                <Col sm={8} >
                  <Form.Control type="text" name="idOrganizatora" value={klubData.idOrganizatora} onChange={handleChange} />
                </Col>
              </Form.Group>

              <div style={{ height: '10px' }}></div>

              <Form.Group controlId="naziv" className="row">
                <Form.Label column sm={4} className="text-end">Naziv kluba</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name="naziv" value={klubData.naziv} onChange={handleChange} />
                </Col>
              </Form.Group>


              <div style={{ height: '10px' }}></div>

              <Form.Group controlId="lokacija" className="row">
                <Form.Label column sm={4} className="text-end">Lokacija kluba</Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name="lokacija" value={klubData.lokacija} onChange={handleChange} />
                </Col>
              </Form.Group>

              <div style={{ height: '10px' }}></div>

              <Form.Group controlId="slikaS" className="row">
                <Form.Label column sm={4} className="text-end">Slika kluba</Form.Label>
                <Col sm={8}>
                  <Form.Control type="file" name="slikaS" onChange={handleImageSlika} />
                </Col>
              </Form.Group>
              <div style={{ height: '10px' }}></div>
            </Col>


            <Col sm={6} className="d-flex flex-column justify-content-start">
              <Form.Group controlId="brojStolovaBS" className="row">
                <Form.Label column sm={4} className="text-end">Broj stolova (barski)</Form.Label>
                <Col sm={8}>
                  <Form.Control type="number" name="brojStolovaBS" value={klubData.brojStolovaBS} onChange={handleChange} />
                </Col>
              </Form.Group>

              <div style={{ height: '10px' }}></div>

              <Form.Group controlId="brojStolovaVS" className="row">
                <Form.Label column sm={4} className="text-end">Broj stolova (viseci)</Form.Label>
                <Col sm={8}>
                  <Form.Control type="number" name="brojStolovaVS" value={klubData.brojStolovaVS} onChange={handleChange} />
                </Col>
              </Form.Group>

              <div style={{ height: '10px' }}></div>

              <Form.Group controlId="brojStolovaS" className="row">
                <Form.Label column sm={4} className="text-end">Broj separea</Form.Label>
                <Col sm={8}>
                  <Form.Control type="number" name="brojStolovaS" value={klubData.brojStolovaS} onChange={handleChange} />
                </Col>
              </Form.Group>

              <div style={{ height: '10px' }}></div>

              <Form.Group controlId="slikaM" className="row">
                <Form.Label column sm={4} className="text-end">Mapa kluba</Form.Label>
                <Col sm={8}>
                  <Form.Control type="file" name="slikaM" onChange={handleImageMapa} />
                </Col>
              </Form.Group>
              <div style={{ height: '10px' }}></div>
            </Col>

          </Row>

          <Row>
            <Col className="text-center">
              <Button type="submit" className="btn btn-primary">Dodaj klub</Button>
            </Col>
          </Row>
        </Form>
      </Container>






      <Col md={{ span: 6, offset: 6 }}></Col>

      <div className="d-flex justify-content-center">
        <div className="col-md-6 col-sm-8 col-xs-10 pt-5">
          <h2 style={{ textAlign: 'center' }}>Lista Klubova</h2>
          <Table responsive="md" striped bordered hover className="table-white table-white mt-3 mb-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Lokacija</th>
                <th>Ocena</th>
                <th>Broj b. stolova</th>
                <th>Broj v. stolova</th>
                <th>Broj separea</th>
                <th>ID organizatora</th>
                <th>Username organizatora</th>
                <th>Brisanje</th>
              </tr>
            </thead>
            <tbody>
              {klubovi.map((klub, index) => (
                <tr key={index}>
                  <td>{klub.id}</td>
                  <td>{klub.naziv}</td>
                  <td>{klub.lokacija}</td>
                  <td>{izracunajProsek(klub.ocene)}</td>
                  <td>{klub.brojStolovaBS}</td>
                  <td>{klub.brojStolovaVS}</td>
                  <td>{klub.brojStolovaS}</td>
                  <td>{klub.idOrganizatora}</td>
                  <td>{klub.usernameOrganizatora}</td>
                  <td>
                      <Button variant="danger" onClick={() => handleBrisanje(index)} style={{ backgroundColor: "red", margin: "15px auto"}}>
                       Obrisi
                       </Button>

            </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Uspešno dodavanje kluba</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Klub je uspešno dodat.</p>
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