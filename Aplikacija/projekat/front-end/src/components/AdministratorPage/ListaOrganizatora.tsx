import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import AdministratorHeader from "./AdministratorHeader";
import OrganizatorType from "../../types/OrganizatorType";
import { ApiConfig } from "../../config/api.config";
import { Table } from "react-bootstrap";



export default function ListaOrganizatora() {


    const [organizatori, setOrganizatori] = useState<Array<OrganizatorType>>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {

        axios.get(ApiConfig.BASE_URL + "/Organizator/VratiOrganizatore")
            .then((response: AxiosResponse<OrganizatorType[]>) => {
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setOrganizatori(data);
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
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>KlubID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {organizatori.map((organizator, index) => (
                        <tr key={index}>
                            <td>{organizator.ime}</td>
                            <td>{organizator.prezime}</td>
                            <td>{organizator.username}</td>
                            <td>{organizator.email}</td>
                            <td>{organizator.klubId}</td>
                            <td>{organizator.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div></>
    );
              
}