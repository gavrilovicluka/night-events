import DogadjajType from "./DogadjajType";
import RezervacijaType from "./RezervacijaType";
import { StatusStolaType } from "./StatusStolaType";

export default class StoType {
    id?: number;
    status?: StatusStolaType;
    dogadjaj?: DogadjajType;
    rezervacija?: RezervacijaType;
    vrstaStola?: string;
}