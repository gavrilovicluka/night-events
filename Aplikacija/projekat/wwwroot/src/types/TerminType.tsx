import DogadjajType from "./DogadjajType";
import MuzickiIzvodjacType from "./MuzickiIzvodjacType";


export default class TerminType {
    id?: number;
    MuzIzvodjaca?: MuzickiIzvodjacType;
    termin?: Date;
    rezervisan?: boolean;
    dogadjaj? : DogadjajType[];
    
    
}