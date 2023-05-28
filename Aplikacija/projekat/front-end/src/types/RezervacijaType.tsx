import DogadjajType from "./DogadjajType";
import KorisnikType from "./KorisnikType";
import StoType from "./StoType";

export default class RezervacijaType {
    id?: number;
    datum?: Date;
    sto?: StoType;
    korisnik?: KorisnikType;
    dogadjaj?: DogadjajType;
}