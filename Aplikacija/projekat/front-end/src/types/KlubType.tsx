import DogadjajType from "./DogadjajType";
import OcenaKlubType from "./OcenaKlubType";

export default class KlubType {
    id?: number;
    naziv?: string;
    lokacija?: string;
    ocene?: OcenaKlubType[] | null;
    kapacitet?: number;
    idOrganizatora?: number | null;
    usernameOrganizatora?: string | null;
    dogadjaji?: DogadjajType[] | null;
}