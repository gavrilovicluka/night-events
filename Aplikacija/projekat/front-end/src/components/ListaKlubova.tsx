import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import KlubType from "../types/KlubType";
import AdministratorHeader from "./AdministratorHeader";



export default function ListaKlubova() {


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
        <><AdministratorHeader />
        <div>
            <table>
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
        </div></>
    );
              
}