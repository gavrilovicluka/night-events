import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import AdministratorHeader from "./AdministratorHeader";
import OrganizatorType from "../../types/OrganizatorType";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import { StatusNalogaType } from "../../types/StatusNalogaType";



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
    function getStatusNaloga(status: StatusNalogaType): string {

        switch (status) {
          case 0:
            return "Odobren";
          case 1:
            return "Na čekanju";
          case 2:
            return "Odbijen";
          default:
            return ""; // Vratiti prazan string za nepoznat status
        }
      }
      const handleOdobri = (index: number) => {
        // Kreiranje kopije niza organizatori radi ažuriranja statusa naloga
        const updatedOrganizatori = [...organizatori];
        updatedOrganizatori[index].status = 0; // Postavljanje statusa na Odobren
        setOrganizatori(updatedOrganizatori);
        const idOrganizatora = updatedOrganizatori[index].id;
  
      axios
        .put(
          ApiConfig.BASE_URL + `/Administrator/OdobriNalog/${idOrganizatora}`
        )
        .then((response) => {
          console.log(response.data); // Ažuriranje uspešno
        })
        .catch((error) => {
          console.log("Došlo je do greške prilikom slanja zahteva:", error);
        });
      };
  
      const handleOdbij = (index: number) => {
        // Kreiranje kopije niza ogranizatori radi ažuriranja statusa naloga
        const updatedOrganizatori = [...organizatori];
        updatedOrganizatori[index].status = 2; // Postavljanje statusa na Odbijen
        setOrganizatori(updatedOrganizatori);
        const idOrganizatora = updatedOrganizatori[index].id;
  
      axios
        .put(
          ApiConfig.BASE_URL + `/Administrator/OdbijNalog/${idOrganizatora}`
        )
        .then((response) => {
          console.log(response.data); // Ažuriranje uspešno
        })
        .catch((error) => {
          console.log("Došlo je do greške prilikom slanja zahteva:", error);
        });
      };


    return (
        <><AdministratorHeader />
        <div>
            <Table striped bordered className="table-white">
                <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>{organizator.id}</td>
                            <td>{organizator.ime}</td>
                            <td>{organizator.prezime}</td>
                            <td>{organizator.username}</td>
                            <td>{organizator.email}</td>
                            <td>{organizator.klubId}</td>
                            <td>{organizator.status !== undefined ? getStatusNaloga(organizator.status) : ""}</td>
                            <td>
                    {organizator.status === 0 ? (

                      <Button variant="success" disabled style={{ backgroundColor: "green", marginRight: "10px" }}>{' '}
                        Odobri
                      </Button>
                    ) : (
                      <Button variant="success" onClick={() => handleOdobri(index)} style={{ backgroundColor: "green", marginRight: "10px" }}>
                        Odobri
                      </Button>
                    )}

                    {organizator.status === 2 ? (
                      <Button variant="danger" disabled style={{ backgroundColor: "red" }}>
                        Odbij
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={() => handleOdbij(index)} style={{ backgroundColor: "red" }}>
                        Odbij
                      </Button>
                    )}
            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div></>
    );
              
}