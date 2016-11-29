
module Emeric0101.PHPAngular.Entity {
    export interface IUser {
        getMail();

        setMail(m : string);
        getGroupe<T>() : Promise<T>;
    }
}
