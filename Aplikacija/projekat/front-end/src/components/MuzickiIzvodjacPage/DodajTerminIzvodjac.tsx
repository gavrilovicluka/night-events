import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import { ApiConfig } from "../../config/api.config";
import { Button, Form, Modal } from "react-bootstrap";

function DodajTerminIzvodjac() {

  const [datum, setDatum] = useState('');
  const [idIzvodjaca, setIdIzvodjaca] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-CA');
    setDatum(formattedDate);
  }, []);


  const data = {
    idIzvodjaca: idIzvodjaca,
    datum: datum
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post(ApiConfig.BASE_URL + `/MuzickiIzvodjac/PostaviSlobodanTermin`, data);
     
      if (response.status === 200) {
        const data = response.data;
        setShowModal(true);
        
      } else {
        // Dodatna logika za obradu neuspešnog odgovora
      }
    }catch (error) {
      console.error('Greška prilikom poziva API funkcije:', error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload(); // Osvežavanje stranice nakon zatvaranja moda
  };

  const handleDatumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatum(event.target.value);
  };

  const handleIdIzvodjacaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdIzvodjaca(event.target.value);
  };
    

  return (
    <>
      <MuzickiIzvodjacHeader />

      <div className="d-flex justify-content-center">
      <div className="col-md-6">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Datum</Form.Label>
          <Form.Control 
            type="date" 
            placeholder="Unesite datum" 
            value={datum}
            onChange={handleDatumChange}
            required />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID Izvođača</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite ID izvođača"
            value={idIzvodjaca}
            onChange={handleIdIzvodjacaChange}
            required
            title="Polje ID izvođača je obavezno."
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
        >
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
