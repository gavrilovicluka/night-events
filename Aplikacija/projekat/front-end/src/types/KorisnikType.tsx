import RezervacijaType from "./RezervacijaType";

export default class KorisnikType {
    id?: number;
    username?: string;
    email?: string;
    ime?: string;
    prezime?: string;
    rezervacije?: RezervacijaType[];
}