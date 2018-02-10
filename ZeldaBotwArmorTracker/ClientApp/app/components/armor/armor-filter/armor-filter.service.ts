import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ArmorFilter } from "./ArmorFilter";

@Injectable()
export class ArmorFilterService {

    private messageSource = new BehaviorSubject<ArmorFilter>(new ArmorFilter());

    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeFilter(name: string, onlyObtained: boolean, onlyNotFullyUpgraded: boolean, hideAmiibo: boolean) {
        let filter = new ArmorFilter();
        filter.name = name;
        filter.onlyNotFullyUpgraded = onlyNotFullyUpgraded;
        filter.onlyObtained = onlyObtained;
        filter.hideAmiibo = hideAmiibo;
        this.messageSource.next(filter);
    }
}