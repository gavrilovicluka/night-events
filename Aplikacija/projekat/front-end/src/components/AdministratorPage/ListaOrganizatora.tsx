import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import AdministratorHeader from "./AdministratorHeader";
import OrganizatorType from "../../types/OrganizatorType";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import { StatusNalogaType } from "../../types/StatusNalogaType";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../types/DecodedToken";
import { useNavigate } from "react-router-dom";

export default function ListaOrganizatora() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    const token = localStorage.getItem("jwtToken");
    if (token === null || token === undefined) {
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token) as DecodedToken;
    if (decodedToken.role !== "Admin") {
      navigate("/");
      return;
    }
  });

  const [organizatori, setOrganizatori] = useState<Array<OrganizatorType>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(ApiConfig.BASE_URL + "/Organizator/VratiOrganizatore")
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
        console.log("Došlo je do greške prilikom slanja zahteva:", error);
      });
  };
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
      .put(ApiConfig.BASE_URL + `/Administrator/OdobriNalog/${idOrganizatora}`)
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
      .put(ApiConfig.BASE_URL + `/Administrator/OdbijNalog/${idOrganizatora}`)
      .then((response) => {
        console.log(response.data); // Ažuriranje uspešno
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahteva:", error);
      });
  };

  const handleBrisanje = (index: number) => {
    const confirmed = window.confirm("Da li želite da obrišete organizatora?");
    if (confirmed) {
      // Kreiranje kopije niza organizatori radi ažuriranja liste
      const updatedOrganizatori = [...organizatori];
      const idOrganizatora = updatedOrganizatori[index].id;

      axios
        .delete(
          ApiConfig.BASE_URL +
            `/Administrator/ObrisiOrganizatora/${idOrganizatora}`
        )
        .then((response) => {
          // Uspesno brisanje, obradite odgovor
          console.log(response.data);

          // Ažurirajte lokalni niz organizatori ako je potrebno
          // Na primer, možete ukloniti obrisanog organizatora iz liste
          updatedOrganizatori.splice(index, 1);
          setOrganizatori(updatedOrganizatori);
        })
        .catch((error) => {
          // Greška prilikom brisanja, obradite grešku
          console.log("Došlo je do greške prilikom slanja zahteva:", error);
        });
    }
  };

  return (
    <>
      <AdministratorHeader />
      <div>
        <div className="d-flex justify-content-center">
          <div className="col-md-6 col-sm-8 col-xs-10 pt-5">
            <Table
              responsive="md"
              striped
              bordered
              hover
              className="table-white table-white mt-3 mb-3"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>KlubID</th>
                  <th>Status</th>
                  <th>Akcija</th>
                  <th>Brisanje</th>
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
                    <td>
                      {organizator.klubId !== undefined &&
                      organizator.klubId > 0
                        ? organizator.klubId
                        : "Nema"}
                    </td>
                    <td>
                      {organizator.status !== undefined
                        ? getStatusNaloga(organizator.status)
                        : ""}
                    </td>
                    <td>
                      {organizator.status === 0 ? (
                        <Button
                          variant="success"
                          disabled
                          style={{
                            backgroundColor: "green",
                            marginRight: "10px",
                          }}
                        >
                          {" "}
                          Odobri
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleOdobri(index)}
                          style={{
                            backgroundColor: "green",
                            marginRight: "10px",
                          }}
                        >
                          Odobri
                        </Button>
                      )}

                      {organizator.status === 2 ? (
                        <Button
                          variant="danger"
                          disabled
                          style={{ backgroundColor: "red" }}
                        >
                          Odbij
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => handleOdbij(index)}
                          style={{ backgroundColor: "red" }}
                        >
                          Odbij
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleBrisanje(index)}
                        style={{ backgroundColor: "red", margin: "15px auto" }}
                      >
                        Obrisi
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
