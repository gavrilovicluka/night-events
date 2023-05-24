import { useState } from "react";
import TerminType from "../types/TerminType";
import axios from "axios";

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
        .put(`https://localhost:7037/MuzickiIzvodjac/PostaviSlobodanTermin/${eventDate.idIzvodjaca}`)
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
            <form>
  <div className="form-group">
    <label htmlFor="datum">Datum</label>
    <input
      type="date"
      className="form-control"
      id="datum"
      placeholder="Unesite datum"
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="idIzvodjaca">ID Izvođača</label>
    <input
      type="text"
      className="form-control"
      id="idIzvodjaca"
      placeholder="Unesite ID izvođača"
      required
    />
  </div>
  <button type="submit" className="btn btn-primary">Dodaj termin</button>
</form>
        );
}

export default DodajTerminIzvodjac;