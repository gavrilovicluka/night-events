import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import KlubType from "../../types/KlubType";
import AdministratorHeader from "./AdministratorHeader";
import { Col, Container } from "react-bootstrap";



export default function ListaKlubova() {

    // const ClubForm = () => {
       const [klubData, setKlubData] = useState({
          idOrganizatora: '',
          naziv: '',
          lokacija: '',
          brojStolova: ''
        });
      
        const handleChange = (e:KlubType) => {
           setKlubData({ ...klubData, [e.target.name]: e.target.value });
         };
      
         const handleSubmit = (e:any) => {
          e.preventDefault();
      
           axios.post(`https://localhost:7037/DodajKlub/${klubData.idOrganizatora}/${klubData.naziv}/${klubData.lokacija}/${klubData.brojStolova}`)
             .then((response) => {
               console.log(response.data);
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

        axios.get("https://localhost:7037/Klub/VratiKlubove")
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
                  console.log("Došlo je do greške prilikom slanja zahtjeva:", error);
                });
    }

    return (
        <>
        <AdministratorHeader />

         
        <Container>
                <Col md= { {span : 6, offset: 6}}></Col>

        <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          <div className="form-group row">
            <label htmlFor="idOrganizatora" className="col-sm-2 col-form-label">ID organizatora</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="idOrganizatora" name="idOrganizatora" value={klubData.idOrganizatora} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="naziv" className="col-sm-2 col-form-label">Naziv kluba</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="naziv" name="naziv" value={klubData.naziv} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lokacija" className="col-sm-2 col-form-label">Lokacija kluba</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="lokacija" name="lokacija" value={klubData.lokacija} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="brojStolova" className="col-sm-2 col-form-label">Broj stolova</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="brojStolova" name="brojStolova" value={klubData.brojStolova} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
          <div className="col-sm-10 offset-sm-2 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Dodaj klub</button>
            </div>
          </div>
        </form>
        </Container>
         
         <Container>
         <Col md= { {span : 6, offset: 6}}></Col>

       <div className="d-flex justify-content-center">
        <h2 style={{ textAlign: 'center' }}>Lista Klubova</h2>
          <table className="text-center" style={{ marginTop: '40px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Lokacija</th>
                <th>Ocena</th>
                <th>Kapacitet</th>
                <th>ID organizatora</th>
                <th>Username organizatora</th>
              </tr>
            </thead>
            <tbody>
              {klubovi.map((klub, index) => (
                <tr key={index}>
                  <td>{klub.id}</td>
                  <td>{klub.naziv}</td>
                  <td>{klub.lokacija}</td>
                  <td>{klub.kapacitet}</td>
                  <td>{klub.idOrganizatora}</td>
                  <td>{klub.usernameOrganizatora}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </Container>
        
      </>

       
    );
              
}