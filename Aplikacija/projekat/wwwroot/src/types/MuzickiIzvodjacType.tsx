import DogadjajType from "./DogadjajType";
import { StatusNalogaType } from "./StatusNalogaType";
import TerminType from "./TerminType";

export default class MuzickiIzvodjacType {
    id?: number;
    username?: string;
    imeIzvodjaca?: string;
    zanr?: string;
    brojClanova?: number;
    email?: string;
    termini?: TerminType[] | null;
    dogadjaji?: DogadjajType[] | null;
    status?: StatusNalogaType;
}