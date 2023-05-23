import DogadjajType from "./DogadjajType";
import TerminType from "./TerminType";

export default class MuzickiIzvodjacType {
    id?: number;
    username?: string;
    imeIzvodjaca?: string;
    zanr?: number;
    brojClanova?: number;
    ocena?: number;
    termini?: TerminType;
    dogadjaji?: DogadjajType;
    status?:string;
}