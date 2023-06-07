import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import AdministratorHeader from "./AdministratorHeader";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import { StatusNalogaType } from "../../types/StatusNalogaType";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../types/DecodedToken";
import { useNavigate } from "react-router-dom";

export default function ListaIzvodjacaAdminPage() {
  const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);
  const [token, setToken] = useState<string>();

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

    setToken(token);
    const decodedToken = jwtDecode(token) as DecodedToken;
    if (decodedToken.role !== "Admin") {
      navigate("/");
      return;
    }

    getData(token);
  }, [token]);


  const getData = (token: string | null | undefined) => {
    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }

    axios
      .get(ApiConfig.BASE_URL + "/MuzickiIzvodjac/VratiMuzickeIzvodjace", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        return ""; 
    }
  }

  const handleOdobri = (index: number, token: string | null | undefined) => {
    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }

    const updatedIzvodjaci = [...izvodjaci];
    updatedIzvodjaci[index].status = 0; // Odobren
    setIzvodjaci(updatedIzvodjaci);
    const idIzvodjaca = updatedIzvodjaci[index].id;

    axios ({
      method: 'put',
      url: `${ApiConfig.BASE_URL}/Administrator/OdobriNalogIzvodjaca/${idIzvodjaca}`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data); 
        //getData(token);
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

    const updatedIzvodjaci = [...izvodjaci];
    updatedIzvodjaci[index].status = 2; // Odbijen
    setIzvodjaci(updatedIzvodjaci);
    const idIzvodjaca = updatedIzvodjaci[index].id;

    axios ({
      method: 'put',
      url: `${ApiConfig.BASE_URL}/Administrator/OdbijNalogIzvodjaca/${idIzvodjaca}`,
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

  // const handleBrisanje = (index: number) => {
  //   const confirmed = window.confirm("Da li želite da obrišete izvodjaca?");
  //   if (confirmed) {
  //     const updatedIzvodjaci = [...izvodjaci];
  //     const idIzvodjaca = updatedIzvodjaci[index].id;

  //     axios
  //       .delete(
  //         ApiConfig.BASE_URL + `/Administrator/ObrisiIzvodjaca/${idIzvodjaca}`, {
  //           headers: {
  //             'Content-Type': 'application/json; charset=UTF-8',
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         updatedIzvodjaci.splice(index, 1);
  //         setIzvodjaci(updatedIzvodjaci);
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.log("Došlo je do greške prilikom slanja zahteva:", error);
  //       });
  //   }
  // };

  return (
    <>
      <AdministratorHeader />
      {/* <div className="d-flex justify-content-center pt-4"> */}
      <div className="table-responsive d-flex justify-content-center pt-4">
          <Table striped bordered hover className="text-center table-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime izvođača</th>
                <th>Username</th>
                <th>Zanr</th>
                <th>Broj članova</th>
                <th>Status</th>
                <th>Akcija</th>
                {/* <th>Brisanje</th> */}
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
                  <td>
                    {izvodjac.status !== undefined
                      ? getStatusNaloga(izvodjac.status)
                      : ""}
                  </td>
                  <td className="d-flex space-evenly" >
                    {izvodjac.status === 0 ? (
                      <Button
                        variant="success"
                        disabled
                        style={{
                          backgroundColor: "green",
                          marginRight: "10px"
                        }}
                      >
                        {" "}
                        Odobri
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleOdobri(index, token)}
                        style={{ backgroundColor: "green",
                        marginRight: "10px"}}
                      >
                        Odobri
                      </Button>
                    )}

                    {izvodjac.status === 2 ? (
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
                        onClick={() => handleOdbij(index, token)}
                        style={{ backgroundColor: "red" }}
                      >
                        Odbij
                      </Button>
                    )}
                  </td>
                  {/* <td>
                    <Button
                      variant="danger"
                      onClick={() => handleBrisanje(index)}
                      style={{ backgroundColor: "red" }}
                    >
                      Obrisi
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      {/* </div> */}
    </>
  );
}
