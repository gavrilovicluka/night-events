import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import OrganizatorHeader from "./OrganizatorHeader";


export default function ListaIzvodjaca() {


    const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {

        axios.get("https://localhost:7037/MuzickiIzvodjac/VratiMuzickeIzvodjace")
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
                  console.log("Došlo je do greške prilikom slanja zahtjeva:", error);
                });
    }

    return (
        <><OrganizatorHeader />
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ime izvodjaca</th>
                        <th>Zanr</th>
                        <th>Broj clanova</th>
                        <th>Ocena</th>
                        <th>Termini</th>
                        <th>Dogadjaji</th>
                    </tr>
                </thead>
                <tbody>
                    {izvodjaci.map((izvodjac, index) => (
                        <tr key={index}>
                            <td>{izvodjac.imeIzvodjaca}</td>
                            <td>{izvodjac.zanr}</td>
                            <td>{izvodjac.brojClanova}</td>
                            <td>{izvodjac.ocena}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></>
    );
              
}