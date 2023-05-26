import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import KlubType from "../../types/KlubType";
import AdministratorHeader from "./AdministratorHeader";
import { Button, Col, Container, Form, Table } from "react-bootstrap";
import { ApiConfig } from "../../config/api.config";



export default function ListaKlubova() {

    // const ClubForm = () => {
       const [klubData, setKlubData] = useState({
          idOrganizatora: '',
          naziv: '',
          lokacija: '',
          brojStolova: ''
        });
        const [image, setImage] = useState('');
		
      // function handleImage(e:ChangeEvent<HTMLInputElement>) {
      //   console.log(e.target.files)
      //   setImage(e.target.files[0])
      //   }
      function handleImage(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          const selectedFile = e.target.files[0];
          const imageUrl = URL.createObjectURL(selectedFile);
          console.log(imageUrl);
          setImage(imageUrl);
        }
      }


      
        const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
           setKlubData({ ...klubData, [e.target.name]: e.target.value });
         };
      
         const handleSubmit = (e:any) => {
          e.preventDefault();
          const formData= new FormData()
     formData.append('image', image);
          e.preventDefault();
      
           axios.post(ApiConfig.BASE_URL + `/DodajKlub/${klubData.idOrganizatora}/${klubData.naziv}/${klubData.lokacija}/${klubData.brojStolova}`, formData)
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
                  console.log("Došlo je do greške prilikom slanja zahtjeva:", error);
                });
    }

    return (
        <>
        <AdministratorHeader />

         
        <Container>
        <Col md= { {span : 6, offset: 6}}></Col>
        

            <Form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
      <Form.Group controlId="idOrganizatora" className="row">
        <Form.Label column sm={2}>ID organizatora</Form.Label>
        <Form.Control type="text" name="idOrganizatora" value={klubData.idOrganizatora} onChange={handleChange} className="col-sm-10" />
      </Form.Group>

      <Form.Group controlId="naziv" className="row">
        <Form.Label column sm={2}>Naziv kluba</Form.Label>
        <Form.Control type="text" name="naziv" value={klubData.naziv} onChange={handleChange} className="col-sm-10" />
      </Form.Group>

      <Form.Group controlId="lokacija" className="row">
        <Form.Label column sm={2}>Lokacija kluba</Form.Label>
        <Form.Control type="text" name="lokacija" value={klubData.lokacija} onChange={handleChange} className="col-sm-10" />
      </Form.Group>

      <Form.Group controlId="brojStolova" className="row">
        <Form.Label column sm={2}>Broj stolova</Form.Label>
        <Form.Control type="text" name="brojStolova" value={klubData.brojStolova} onChange={handleChange} className="col-sm-10" />
      </Form.Group>

      <Form.Group controlId="slika" className="row">
        <Form.Label column sm={2}>Slika kluba</Form.Label>
        <Form.Control type="file" name="slika" onChange={handleImage} className="col-sm-10" />
      </Form.Group>

      <Form.Group className="row">
        <div className="col-sm-10 offset-sm-2 d-flex justify-content-center">
          <Button type="submit" className="btn btn-primary">Dodaj klub</Button>
        </div>
      </Form.Group>
    </Form>

        </Container>

         
        <Container>
        <Col md= { {span : 6, offset: 6}}></Col>

       <div className="d-flex justify-content-center">
        <h2 style={{ textAlign: 'center' }}>Lista Klubova</h2>
          <Table className="text-center" style={{ marginTop: '40px' }}>
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
          </Table>
          </div>
          </Container>
        
      </>

       
    );
              
}