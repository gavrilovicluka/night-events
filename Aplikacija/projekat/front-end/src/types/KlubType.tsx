import DogadjajType from "./DogadjajType";
import OcenaKlubType from "./OcenaKlubType";

export default class KlubType {
    id?: number;
    naziv?: string;
    lokacija?: string;
    slikaKluba?: string;
    ocene?: OcenaKlubType[] | null;
    brojStolovaBS?: number;
    brojStolovaVS?: number;
    brojStolovaS?: number;
    idOrganizatora?: number | null;
    usernameOrganizatora?: string | null;
    dogadjaji?: DogadjajType[] | null;
}