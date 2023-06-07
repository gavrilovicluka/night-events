import KlubType from "./KlubType";
import MuzickiIzvodjacType from "./MuzickiIzvodjacType";
import OrganizatorType from "./OrganizatorType";
import RezervacijaType from "./RezervacijaType";
import StoType from "./StoType";


export default class DogadjajType {
    id?: number;
    naziv?: string;
    datum?: Date;
    vreme?: string;
    klub?: KlubType;
    izvodjac?: MuzickiIzvodjacType;
    stolovi?: StoType[];
    rezervacije?: RezervacijaType[];
    brojRezervacija?: number;
    organizator?: OrganizatorType;
    
    
}