import { StatusNalogaType } from "./StatusNalogaType";

export default class OrganizatorType {
    id?:number;
    ime?:string;
    prezime?: string;
    username?: string;
    email?: string;
    status?:StatusNalogaType;
    klubId?:number;
}