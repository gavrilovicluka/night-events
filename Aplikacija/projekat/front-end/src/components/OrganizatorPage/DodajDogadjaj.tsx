import { ChangeEvent, useState } from "react";
import OrganizatorHeader from "./OrganizatorHeader";
import { Col, Container } from "react-bootstrap";
import axios from "axios";
import DogadjajType from "../../types/DogadjajType";
import { ApiConfig } from "../../config/api.config";



export default function DodajDogadjaj() {

    // treba da se prosledi id org preko tokena 

    const [dogadjajData, setDogadjajData] = useState({
        id: '',
        naziv: '',
        datumIVreme: '',
        
      });

      const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setDogadjajData({ ...dogadjajData, [e.target.name]: e.target.value });
       };

       const handleSubmit = (e:any) => {
        e.preventDefault();

        axios.post(ApiConfig.BASE_URL + `/DodajDogadjaj/${dogadjajData.id}/${dogadjajData.naziv}/${dogadjajData.datumIVreme}`)
           .then((response) => {
             console.log(response.data);
           })
           .catch((error) => {
            console.log(error);
          });
      };

    return (
        <>
        <OrganizatorHeader />

         
        <Container>
                <Col md= { {span : 6, offset: 6}}></Col>

        <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
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
        </form>
        </Container>
      </>

       
    );
              
}