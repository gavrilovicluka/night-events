import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import AdministratorHeader from "./AdministratorHeader";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import OcenaMuzickiIzvodjacType from "../../types/OcenaMuzickiIzvodjacType";
import { StatusNalogaType } from "../../types/StatusNalogaType";







export default function ListaIzvodjacaAdminPage() {


    const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);
    

    useEffect(() => {
        getData();
    }, []);

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
                  console.log("Došlo je do greške prilikom slanja zahtjeva:", error);
                });
    }

    

    function izracunajProsek(ocene: OcenaMuzickiIzvodjacType[] | null | undefined) {
      if (!ocene || ocene.length === 0) {
        return 0; 
      }
    
      var oceneBezNula = ocene
        .filter(function (ocena) {
          return ocena.ocena !== 0; // Filtriraj nule iz niza ocena
        })
        .map(function (ocena) {
          return ocena.ocena; // Izvuci vrednosti ocena iz objekata
        });
    
      if (oceneBezNula.length === 0) {
        return 0; // Ako su sve ocene nule, prosečna ocena je 0
      }
    
      var sum = oceneBezNula.reduce(function (a, b) {
        if (typeof a === 'number' && typeof b === 'number') {
          return a + b; // Saberi samo ako su a i b brojevi
        } else {
          return (a || 0) + (b || 0); // Ako su a ili b undefined, koristi 0
        }
      }, 0); 
    
      if (typeof sum !== 'number') {
        return 0; 
      }
    
    
      var prosek = sum / oceneBezNula.length;
      return prosek;
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
      
      const updatedIzvodjaci = [...izvodjaci];
      updatedIzvodjaci[index].status = 0; 
      setIzvodjaci(updatedIzvodjaci);
      const idIzvodjaca = updatedIzvodjaci[index].id;

    axios
      .put(
        ApiConfig.BASE_URL + `/Administrator/OdobriNalog/${idIzvodjaca}`
      )
      .then((response) => {
        console.log(response.data); 
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahtjeva:", error);
      });
    };
  
    const handleOdbij = (index: number) => {
      
      const updatedIzvodjaci = [...izvodjaci];
      updatedIzvodjaci[index].status = 2; 
      setIzvodjaci(updatedIzvodjaci);
      const idIzvodjaca = updatedIzvodjaci[index].id;

    axios
      .put(
        ApiConfig.BASE_URL + `/Administrator/OdbijNalog/${idIzvodjaca}`
      )
      .then((response) => {
        console.log(response.data); // Ažuriranje uspešno
      })
      .catch((error) => {
        console.log("Došlo je do greške prilikom slanja zahtjeva:", error);
      });
    };
    
    const handleBrisanje = (index: number) => {
      const confirmed = window.confirm("Da li želite da obrišete izvodjaca?");
      if (confirmed) {
      const updatedIzvodjaci = [...izvodjaci];
      const idIzvodjaca = updatedIzvodjaci[index].id;
    
      axios 
        .delete(ApiConfig.BASE_URL + `/Administrator/ObrisiIzvodjaca/${idIzvodjaca}`)
        .then((response) => {
          console.log(response.data);
          updatedIzvodjaci.splice(index, 1);
          setIzvodjaci(updatedIzvodjaci);
        })
        .catch((error) => {
          console.log("Došlo je do greške prilikom slanja zahteva:", error);
      
        });
      }
    };

    return (
        <>
        <AdministratorHeader />
        <div className="d-flex justify-content-center">
          <div className="table-responsive">
            <Table className="table" striped bordered hover>
      
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime izvođača</th>
            <th>Username</th>
            <th>Zanr</th>
            <th>Broj članova</th>
            <th>Ocena</th>
            <th>Status</th>
            <th>Akcija</th>
            <th>Brisanje</th>
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
              <td>{izracunajProsek(izvodjac.ocene)}</td>
              <td>{izvodjac.status !== undefined ? getStatusNaloga(izvodjac.status) : ""}</td>
              <td>
                    {izvodjac.status === 0 ? (
                      
                      <Button variant="success" disabled style={{ backgroundColor: "green", marginRight: "10px" }}>{' '}
                        Odobri
                      </Button>
                    ) : (
                      <Button variant="success" onClick={() => handleOdobri(index)} style={{ backgroundColor: "green", marginRight: "10px" }}>
                        Odobri
                      </Button>
                    )}
                    
                    {izvodjac.status === 2 ? (
                      <Button variant="danger" disabled style={{ backgroundColor: "red" }}>
                        Odbij
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={() => handleOdbij(index)} style={{ backgroundColor: "red" }}>
                        Odbij
                      </Button>
                    )}
            </td>
            <td>
                      <Button variant="danger" onClick={() => handleBrisanje(index)} style={{ backgroundColor: "red", margin: "15px auto"}}>
                       Obrisi
                       </Button>

            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
        
        </>
    );
              
}