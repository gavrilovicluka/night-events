import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import OrganizatorHeader from "./OrganizatorHeader";
import {  Modal } from "react-bootstrap";
import jwt from 'jsonwebtoken';
import DogadjajType from "../../types/DogadjajType";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import DodajTerminIzvodjac from "../MuzickiIzvodjacPage/DodajTerminIzvodjac";
import { ApiConfig } from "../../config/api.config";



export default function ListaIzvodjaca() {


    const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDogadjaj, setSelectedDogadjaj] = useState<number | null>(null);
    const [selectedIzvodjac, setSelectedIzvodjac] = useState<number | null>(null);
    const [dostupniDogadjaji, setDostupniDogadjaji] = useState<Array<DogadjajType>>([]);

    // const token = localStorage.getItem('jwtToken');
    // let klubId = '';   
    // if (token) {
    //     const decodedToken = jwt.decode(token) as DecodedTokenOrganizator;
    //     if (decodedToken && decodedToken.idKluba) {
    //         klubId = decodedToken.idKluba;
    //     }
    // }
    //treba da se stavi u backend da token sadrzi id kluba za organizatora

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        //getDostupniDogadjaji(parseInt(klubId));
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

        axios.get(ApiConfig.BASE_URL + "/MuzickiIzvodjac/VratiMuzickeIzvodjace")
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
            <select value={selectedDogadjaj !== null ? selectedDogadjaj.toString() : ""} onChange={handleDogadjajChange}>
                <option value="">Izaberite događaj</option>
                {dostupniDogadjaji.map((dogadjaj) => (
                <option key={dogadjaj.id} value={dogadjaj.id}>
                    {dogadjaj.naziv}
                </option>
                ))}
            </select>
            <button onClick={confirmAngazuj}>Potvrdi</button>
        </Modal>

        <div className="d-flex justify-content-center">
            <table className="text-center">
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
            </table>
        </div></>
    );
              
}