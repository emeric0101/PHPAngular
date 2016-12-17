export class StorageService {
    public store(key : string, value : any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    public get(key : string) {
        let value = localStorage.getItem(key);
        if (value === null) {return null;}
        try {
            return JSON.parse(value);
        }
        catch (e){
            return null;
        }
    }
    constructor() {}
}
