import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import OrganizatorHeader from "./OrganizatorHeader";
import {  Button, Form, Modal, Table } from "react-bootstrap";
import DogadjajType from "../../types/DogadjajType";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import { ApiConfig } from "../../config/api.config";
import jwtDecode from "jwt-decode";



export default function ListaIzvodjaca() {


    const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDogadjaj, setSelectedDogadjaj] = useState<number | null>(null);
    const [selectedIzvodjac, setSelectedIzvodjac] = useState<number | null>(null);
    const [dostupniDogadjaji, setDostupniDogadjaji] = useState<Array<DogadjajType>>([]);
    const [klubId, setKlubId] = useState<number | null>();

    const token = localStorage.getItem('jwtToken'); 
    if (token) {
        const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
        if (decodedToken && decodedToken.idKluba) {
            setKlubId(decodedToken.idKluba);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(klubId !== null && klubId !== undefined) {
          getDostupniDogadjaji(klubId);
        } else {
          setDostupniDogadjaji([]);
        }
        
    }, []);

    const getDostupniDogadjaji = async (klubId: number) => {
        try {
            const response = await axios.get(ApiConfig.BASE_URL + `/Dogadjaj/VratiDogadjajeKluba/${klubId}`);
            if (response.status === 200) {
            const data = response.data;
            setDostupniDogadjaji(data);
            } else {
            console.log("Došlo je do greške prilikom dobavljanja događaja.");
            }
        } catch (error) {
            console.log("Došlo je do greške prilikom slanja zahteva:", error);
        }
    };

    const handleAngazuj = (izvodjac: MuzickiIzvodjacType) => {
        setSelectedIzvodjac(izvodjac.id ?? null);
        if(!izvodjac.id) {
            alert("Izaberite izvodjaca.");
            return;
        }
        setShowModal(true);
    };

    const confirmAngazuj = () => {
        if (selectedDogadjaj) {
          
          axios.post(ApiConfig.BASE_URL + `/AngazujIzvodjaca/${selectedIzvodjac}/${selectedDogadjaj}`)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {             
                console.log("Izvođač je uspešno angažovan.");
                window.location.reload();
              } else {
                console.log("Došlo je do greške prilikom angažovanja izvođača.");
              }
            })
            .catch((error) => {
              console.log("Došlo je do greške prilikom slanja zahteva:", error);
            });
    
          setShowModal(false);
        }
    };

    const handleDogadjajChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDogadjaj(event.target.value ? parseInt(event.target.value) : null);
        if(event.target.value == null)
        {
            alert("Morate izabrati dogadjaj!");
            return;
        }
    };

    const getData = () => {

        axios.get(ApiConfig.BASE_URL + "/MuzickiIzvodjac/VratiMuzickeIzvodjace", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then((response: AxiosResponse<MuzickiIzvodjacType[]>) => {
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setIzvodjaci(data);
                  } else {
                    console.log("Došlo je do greške prilikom dobavljanja podataka.");
                  }
                })
                .catch((error) => {
                  console.log("Došlo je do greške prilikom slanja zahteva:", error);
                });
    }

    return (
        <><OrganizatorHeader />
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>

            <h2>Izaberite dogadjaj</h2>
      <Form.Select value={selectedDogadjaj !== null ? selectedDogadjaj.toString() : ""} onChange={handleDogadjajChange}>
        <option value="">Izaberite događaj</option>
        {dostupniDogadjaji.map((dogadjaj) => (
          <option key={dogadjaj.id} value={dogadjaj.id}>
            {dogadjaj.naziv}
          </option>
        ))}
      </Form.Select>
      <Button onClick={confirmAngazuj}>Potvrdi</Button>
        </Modal>

        <div className="d-flex justify-content-center">
            <Table className="text-center">
                <thead>
                    <tr>
                        <th>Ime izvodjaca</th>
                        <th>Zanr</th>
                        <th>Broj clanova</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {izvodjaci.map((izvodjac, index) => (
                        <tr key={index}>
                            <td>{izvodjac.imeIzvodjaca}</td>
                            <td>{izvodjac.zanr}</td>
                            <td>{izvodjac.brojClanova}</td>     
                            <td>
                                <button onClick={() => handleAngazuj(izvodjac)}>Angazuj</button>
                            </td>                     
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div></>
    );
              
}