import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Armor } from "../../armor/Armor";
import { AnalyticsService } from "../../analytics/analytics.service";

@Injectable()
export class ImportService {

    private messageSource = new BehaviorSubject<string>('');

    currentMessage = this.messageSource.asObservable();

    constructor(private _analyticsService: AnalyticsService) { }

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
        this._analyticsService.importFile();
        location.reload();
    }
}