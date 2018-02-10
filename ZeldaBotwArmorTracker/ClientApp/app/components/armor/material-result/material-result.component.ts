import { Component } from "@angular/core";
import { Armor, Material } from "../armor-list.component";
import * as _ from "lodash";
import { ArmorMaterialService } from "../armor-material.service";


@Component({
    selector: 'material-result',
    templateUrl: './material-result.component.html',
    styleUrls: ['./material-result.component.css']
})
export class MaterialResultComponent {

    constructor(private data: ArmorMaterialService) { }

    public allMaterials: Material[] = [];

    ngOnInit() {
        this.data.currentMessage.subscribe(message => this.allMaterials = message)
    }
}

