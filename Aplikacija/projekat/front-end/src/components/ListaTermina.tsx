import { useEffect, useState } from "react";
import MuzickiIzvodjacType from "../types/MuzickiIzvodjacType";
import axios, { AxiosResponse } from "axios";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import TerminType from "../types/TerminType";


export default function ListaTermina() {


    const [termini2, setTermini] = useState<Array<TerminType>>([]);

    useEffect(() => {
        //getData();
    }, []);

    // id izvodjaca treba da se izvuce iz tokena

    // const getData = () => {

    //     axios
    //         .get(`https://localhost:7037/MuzickiIzvodjac/VratiListuTermina/${idMuzIzvodjaca}`)
    //         .then((response: AxiosResponse<TerminType[]>) => {
    //             if (response.status === 200) {
    //                 const data = response.data;
    //                 console.log(data);
    //                 setTermini(data);
    //               } else {
    //                 console.log("Došlo je do greške prilikom dobavljanja podataka.");
    //               }
    //             })
    //             .catch((error) => {
    //               console.log("Došlo je do greške prilikom slanja zahteva:", error);
    //             });
    // }

    return (
        <><MuzickiIzvodjacHeader />
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Termin</th>

                    </tr>
                </thead>
                <tbody>
                    {termini2.map((termin, index) => (
                        <tr key={index}>
                            <td>{termin.datumIVreme?.toLocaleDateString()}</td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div></>
    );

}