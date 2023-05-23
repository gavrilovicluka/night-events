import DogadjajType from "./DogadjajType";

export default class KlubType {
    naziv?: string;
    lokacija?: string;
    ocena?: number;
    kapacitet?: number;
    idOrganizatora?: number | null;
    usernameOrganizatora?: string | null;
    dogadjaji?: DogadjajType | null;
}