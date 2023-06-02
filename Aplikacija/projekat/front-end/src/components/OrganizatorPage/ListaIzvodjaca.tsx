import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import OrganizatorHeader from "./OrganizatorHeader";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DogadjajType from "../../types/DogadjajType";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import { ApiConfig } from "../../config/api.config";
import jwtDecode from "jwt-decode";
import TerminType from "../../types/TerminType";

export default function ListaIzvodjaca() {
  const [izvodjaci, setIzvodjaci] = useState<Array<MuzickiIzvodjacType>>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDogadjajId, setSelectedDogadjajId] = useState<number | null>(
    null
  );
  const [selectedIzvodjac, setSelectedIzvodjac] =
    useState<MuzickiIzvodjacType>();
  const [dostupniDogadjaji, setDostupniDogadjaji] = useState<
    Array<DogadjajType>
  >([]);
  const [klubId, setKlubId] = useState<number | null>();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
      setToken(token);
      if (decodedToken && decodedToken.idKluba) {
        setKlubId(decodedToken.idKluba);
      }
    }

    getData(token);
  }, [token]);

  useEffect(() => {
    if (klubId !== null && klubId !== undefined) {
      getDostupniDogadjaji(klubId, token);
    } else {
      setDostupniDogadjaji([]);
    }
  }, [klubId, token]);

  const getDostupniDogadjaji = async (
    klubId: number,
    token: string | undefined | null
  ) => {
    if (token === null || token === undefined) {
      console.log("Nevalidan token");
      return;
    }
    try {
      const response = await axios.get(
        ApiConfig.BASE_URL +
          `/Dogadjaj/VratiDogadjajeKlubaBezIzvodjaca/${klubId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setDostupniDogadjaji(data);
      } else {
        console.log("Došlo je do greške prilikom dobavljanja događaja.");
      }
    } catch (error) {
      console.log("Došlo je do greške prilikom slanja zahteva:", error);
    }
  };

  const handleAngazuj = (izvodjac: MuzickiIzvodjacType) => {
    if (izvodjac.termini === null || izvodjac.termini?.length === 0) {
      alert("Muzicki izvodjac nema termina");
      return;
    } else {
      if (izvodjac.termini!.every((termin) => termin.rezervisan === true)) {
        alert("Svi termini izvodjaca su rezervisani");
        return;
      }
    }
    setSelectedIzvodjac(izvodjac ?? null);
    if (!izvodjac.id) {
      alert("Izaberite izvodjaca.");
      return;
    }
    setShowModal(true);
  };

  const confirmAngazuj = () => {
    if (selectedDogadjajId) {
      //console.log(selectedDogadjajId);
      const selectedDogadjaj = dostupniDogadjaji.filter(
        (dogadjaj) => dogadjaj.id === selectedDogadjajId
      )[0];
      if (selectedIzvodjac) {
        //console.log(selectedDogadjaj);
        if (selectedIzvodjac.termini) {
          selectedIzvodjac.termini.forEach((termin) => {
            if (
              termin.termin === selectedDogadjaj.datum &&
              termin.rezervisan === true
            ) {
              alert("Muzicki izvodjac je vec angazovan za taj datum");
              return;
            }
          });
        }

        axios({
          method: 'put',
          url: `${ApiConfig.BASE_URL}/Dogadjaj/DodeliIzvodjaca/${selectedDogadjajId}/${selectedIzvodjac.id}`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response: AxiosResponse) => {
            if (response.status === 200) {
              console.log("Izvođač je uspešno angažovan.");
              //console.log(selectedIzvodjac.termini);
              window.location.reload();
            } else {
              console.log("Došlo je do greške prilikom angažovanja izvođača.");
            }
          })
          .catch((error) => {
            console.log("Došlo je do greške prilikom slanja zahteva:", error);
          });

        setShowModal(false);
      }
    } else {
      alert("Morate izabrati dogadjaj");
    }
  };

  const handleDogadjajChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDogadjajId(
      event.target.value ? parseInt(event.target.value) : null
    );

    if (event.target.value == null) {
      alert("Morate izabrati dogadjaj!");
      return;
    }
  };

  const getData = (token: string | undefined | null) => {
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

  return (
    <>
      <OrganizatorHeader />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Izaberite događaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            className="mb-3"
            value={
              selectedDogadjajId !== null ? selectedDogadjajId.toString() : ""
            }
            onChange={handleDogadjajChange}
          >
            <option value="">Izaberite događaj</option>
  {dostupniDogadjaji.map((dogadjaj) => {
    // Filtriraj događaje za izvođača koji ima termin za odabrani datum
    if(selectedIzvodjac?.termini === null || selectedIzvodjac?.termini === undefined)
      return;

    const izvodjacTermini = selectedIzvodjac?.termini.filter(
      (termin: TerminType) => termin.termin === dogadjaj.datum && termin.rezervisan === false
    );

    // Prikazi samo događaje za koje izvođač ima termin
    if (izvodjacTermini && izvodjacTermini.length > 0) {
      return (
        <option key={dogadjaj.id} value={dogadjaj.id}>
          {dogadjaj.naziv}
        </option>
      );
    }

    return null; // Preskoči događaje za koje izvođač nema termin
  })}
          </Form.Select>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={confirmAngazuj}>
              Potvrdi
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-center">
        <Table className="text-center">
          <thead>
            <tr>
              <th>Ime izvodjaca</th>
              <th>Zanr</th>
              <th>Broj clanova</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {izvodjaci.map((izvodjac, index) => (
              <tr key={index}>
                <td>{izvodjac.imeIzvodjaca}</td>
                <td>{izvodjac.zanr}</td>
                <td>{izvodjac.brojClanova}</td>
                <td>
                  <Button onClick={() => handleAngazuj(izvodjac)}>
                    Angazuj
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
