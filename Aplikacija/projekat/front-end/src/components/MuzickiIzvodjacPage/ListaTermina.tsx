import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import TerminType from "../../types/TerminType";
import DodajTerminIzvodjac from "./DodajTerminIzvodjac";
import { ApiConfig } from "../../config/api.config";
import { Button, Table } from "react-bootstrap";
import { compareAsc } from "date-fns";


export default function ListaTermina() {


    const [termini2, setTermini] = useState<Array<TerminType>>([]);


    useEffect(() => {
        getData();
    }, []);

    // id izvodjaca treba da se izvuce iz tokena

    const getData = () => {

        axios
            .get(ApiConfig.BASE_URL + `/MuzickiIzvodjac/VratiListuTermina/1`)        //${idMuzIzvodjaca}
            .then((response: AxiosResponse<TerminType[]>) => {
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    setTermini(data);
                  } else {
                    console.log("Došlo je do greške prilikom dobavljanja podataka.");
                  }
                })
                .catch((error) => {
                  console.log("Došlo je do greške prilikom slanja zahteva:", error);
                });
    }



    return (
        <><MuzickiIzvodjacHeader />
        <div className="d-flex justify-content-center">
        <div className="col-md-6 col-sm-8 col-xs-10 pt-5">
            <Table className="table-secondary" striped bordered hover>
                <thead>
                    <tr>
                        <th>Termin</th>
                        <th>Rezervisan</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {termini2
                    .sort((a, b) => compareAsc(new Date(a.datum?a.datum:''), new Date(b.datum?b.datum:'')))
                    .map((termin, index) => (
                        <tr key={index}>
                            <td>{termin.datum && new Date(termin.datum).toLocaleDateString('sr-RS')}</td>
                            <td>{termin.rezervisan === true ? "DA" : "NE"}</td>
                            <td></td>
                            <td>

            </td>
                            <td> </td>
                        </tr>                      
                    ))}
                </tbody>
            </Table>
        </div>
        </div> </>
    );

}