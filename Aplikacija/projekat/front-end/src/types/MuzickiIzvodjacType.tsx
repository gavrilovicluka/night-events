import DogadjajType from "./DogadjajType";
import OcenaMuzickiIzvodjacType from "./OcenaMuzickiIzvodjacType";
import { StatusNalogaType } from "./StatusNalogaType";
import TerminType from "./TerminType";

export default class MuzickiIzvodjacType {
    id?: number;
    username?: string;
    imeIzvodjaca?: string;
    zanr?: string;
    brojClanova?: number;
    ocene?: OcenaMuzickiIzvodjacType[] | null;
    termini?: TerminType[] | null;
    dogadjaji?: DogadjajType[] | null;
    status?: StatusNalogaType;
}