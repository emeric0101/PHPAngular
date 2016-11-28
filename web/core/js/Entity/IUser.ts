
module Emeric0101.PHPAngular.Entity {
    export interface IUser {
        getMail();

        setMail(m : string);
        getGroupe(cb? : (groupes : IGroup[]) => void) : Emeric0101.PHPAngular.Entity.IGroup[];
    }
}
