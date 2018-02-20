import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Armor } from "../../armor/Armor";

@Injectable()
export class ImportService {

    private messageSource = new BehaviorSubject<string>('');

    currentMessage = this.messageSource.asObservable();

    constructor() { }

    importFileContent(fileContent: string) {
        let armorList: Armor[] = [];
        try {
            fileContent = atob(fileContent);
            armorList = JSON.parse(fileContent) as Armor[];
        }
        catch (Exception) {
            alert('The content of the file could not be read correctly.');
            return;
        }
        if (armorList.length != 107) {
            alert('The content of the file could not be read correctly.');
            return;
        }
        localStorage.setItem("armors", fileContent);
        location.reload();
    }
}