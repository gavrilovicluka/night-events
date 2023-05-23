import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacType from "../types/MuzickiIzvodjacType";
import AdministratorHeader from "./AdministratorHeader";



export default function ListaIzvodjacaAdminPage() {


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
        <><AdministratorHeader />
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ime izvodjaca</th>
                        <th>Username</th>
                        <th>Zanr</th>
                        <th>Broj clanova</th>
                        <th>Ocena</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {izvodjaci.map((izvodjac, index) => (
                        <tr key={index}>
                            <td>{izvodjac.id}</td>
                            <td>{izvodjac.imeIzvodjaca}</td>
                            <td>{izvodjac.username}</td>
                            <td>{izvodjac.zanr}</td>
                            <td>{izvodjac.brojClanova}</td>
                            <td>{izvodjac.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></>
    );
              
}