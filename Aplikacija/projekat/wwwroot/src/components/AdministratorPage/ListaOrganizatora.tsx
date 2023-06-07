import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import AdministratorHeader from "./AdministratorHeader";
import OrganizatorType from "../../types/OrganizatorType";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import { StatusNalogaType } from "../../types/StatusNalogaType";
import { DecodedToken } from "../../types/DecodedToken";
import jwtDecode from "jwt-decode";



export default function ListaOrganizatora() {


  const [organizatori, setOrganizatori] = useState<Array<OrganizatorType>>([]);

  const [token, setToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      setToken(token);
    }
    getData(token);
  }, [token]);

  const getData = (token: string | null | undefined) => {

    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }

    axios.get(ApiConfig.BASE_URL + "/Organizator/VratiOrganizatore", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: AxiosResponse<OrganizatorType[]>) => {
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setOrganizatori(data);
        } else {
          console.log("Doslo je do greske prilikom dobavljanja podataka.");
        }
      })
      .catch((error) => {
        console.log("Doslo je do greske prilikom slanja zahteva:", error);
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
        return ""; 
    }
  }

  const handleOdobri = (index: number, token: string | null | undefined) => {

    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }
    const updatedOrganizatori = [...organizatori];
    updatedOrganizatori[index].status = 0; // Postavljanje statusa na Odobren
    setOrganizatori(updatedOrganizatori);
    const idOrganizatora = updatedOrganizatori[index].id;

    axios ({
      method: 'put',
      url: `${ApiConfig.BASE_URL}/Administrator/OdobriNalogOrganizatora/${idOrganizatora}`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data); 
        //refreshPage();
      })
      .catch((error) => {
        console.log("Doslo je do greske prilikom slanja zahteva:", error);
      });
  };

  const handleOdbij = (index: number, token: string | null | undefined ) => {

    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }
    const updatedOrganizatori = [...organizatori];
    updatedOrganizatori[index].status = 2; // Postavljanje statusa na Odbijen
    setOrganizatori(updatedOrganizatori);
    const idOrganizatora = updatedOrganizatori[index].id;

    axios ({
      method: 'put',
      url: `${ApiConfig.BASE_URL}/Administrator/OdbijNalogOrganizatora/${idOrganizatora}`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        //refreshPage();
      })
      .catch((error) => {
        console.log("Doslo je do greske prilikom slanja zahteva:", error);
      });
  };

  const refreshPage = () => {
    window.location.reload(); 
  };



  return (
    <><AdministratorHeader />
      <div className="table-responsive d-flex justify-content-center" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Table striped bordered hover className="text-center table-white">
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
                <td>{(organizator.klubId && organizator.klubId > 0 ) ? organizator.klubId : "NEMA"}</td>
                <td>{organizator.status !== undefined ? getStatusNaloga(organizator.status) : ""}</td>
                <td className="d-flex space-between">
                  {organizator.status === 0 ? (

                    <Button variant="success" disabled style={{ backgroundColor: "green", marginRight: "10px" }} /*onClick={() => window.location.reload()}*/>{' '}
                      Odobri
                    </Button>
                  ) : (
                    <Button variant="success" onClick={() => handleOdobri(index, token)} style={{ backgroundColor: "green", marginRight: "10px" }}>
                      Odobri
                    </Button>
                  )}

                  {organizator.status === 2 ? (
                    <Button variant="danger" disabled style={{ backgroundColor: "red" }}>
                      Odbij
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={() => handleOdbij(index, token)} style={{ backgroundColor: "red" }}>
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