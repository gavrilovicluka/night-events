import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import OrganizatorHeader from "./OrganizatorHeader";
import DogadjajType from "../../types/DogadjajType";
import { ApiConfig } from "../../config/api.config";
import { Table } from "react-bootstrap";


export default function ListaDogadjaja() {


    const [dogadjaji, setDogadjaji] = useState<Array<DogadjajType>>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {

        // treba da se vrate dogadjaji iz kluba organizatora(dobija se iz tokena prijavljenog organizatora)
        axios.get(ApiConfig.BASE_URL + "/Dogadjaj/VratiDogadjaje")
            .then((response: AxiosResponse<DogadjajType[]>) => {
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setDogadjaji(data);
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
        <div className="d-flex justify-content-center">
            <Table className="text-center">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Datum i vreme</th>
                    </tr>
                </thead>
                <tbody>
                    {dogadjaji.map((dogadjaj, index) => (
                        <tr key={index}>
                            <td>{dogadjaj.naziv}</td>
                            <td>{dogadjaj.datum?.toLocaleDateString()}</td>                          
                            <td>{dogadjaj.vreme}</td>                          
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div></>
    );
              
}