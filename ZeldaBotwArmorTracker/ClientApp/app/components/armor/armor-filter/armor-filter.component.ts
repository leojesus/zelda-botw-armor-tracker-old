import { Component } from "@angular/core";
import * as _ from "lodash";
import { ArmorFilterService } from "./armor-filter.service";
import { ArmorFilter } from "./ArmorFilter";


@Component({
    selector: 'armor-filter',
    templateUrl: './armor-filter.component.html',
    styleUrls: ['./armor-filter.component.css']
})
export class ArmorFilterComponent {

    constructor(private data: ArmorFilterService) {
        this.filter = new ArmorFilter();
    }

    public filter: ArmorFilter;

    ngOnInit() {
        this.data.currentMessage.subscribe(message => this.filter = message)
    }

    changeFiter() {
        this.data.changeFilter(this.filter.name,
            this.filter.onlyObtained,
            this.filter.onlyNotFullyUpgraded,
            this.filter.hideAmiibo,
            this.filter.hideDlc,
            this.filter.onlyNotObtained);
    }
}

