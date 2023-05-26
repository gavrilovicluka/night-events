import { useState } from "react";
import TerminType from "../../types/TerminType";
import axios from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import { ApiConfig } from "../../config/api.config";
import { Button, Form } from "react-bootstrap";

const DodajTerminForm = () => {
    const [eventDate, setEventDate] = useState({
      datum: '',
      idIzvodjaca: ''
    });
  
    const handleChange = (e : TerminType) => {
        setEventDate({ ...eventDate, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e : any) => {
      e.preventDefault();
  
      axios
        .put(ApiConfig.BASE_URL + `/MuzickiIzvodjac/PostaviSlobodanTermin/${eventDate.idIzvodjaca}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
}


function DodajTerminIzvodjac() 
{
  return (
        <><MuzickiIzvodjacHeader />
        <Form>
  <Form.Group>
    <Form.Label>Datum</Form.Label>
    <Form.Control
      type="date"
      placeholder="Unesite datum"
      required
    />
  </Form.Group>
  <Form.Group>
    <Form.Label>ID Izvođača</Form.Label>
    <Form.Control
      type="text"
      placeholder="Unesite ID izvođača"
      required
    />
  </Form.Group>
  <Button type="submit" variant="primary">Dodaj termin</Button>
</Form>
        </>
      );
}

export default DodajTerminIzvodjac;