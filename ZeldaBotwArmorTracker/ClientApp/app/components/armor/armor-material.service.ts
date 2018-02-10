import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Armor } from "./Armor";
import { Material } from "./Material";

@Injectable()
export class ArmorMaterialService {

    private messageSource = new BehaviorSubject<Material[]>([]);

    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(armors: Armor[]) {

        if (armors !== undefined && armors !== null) {

            let materials: Material[] = [];

            _(armors).forEach(function (x) {
                let filter = _(x.listOfUpgradeMaterials)
                    .filter(function (o) { return o.forLevel > x.currentLevel }).value();
                materials = _.concat(materials, filter);
            });
            var a = _(materials)
                .groupBy('name')
                .map((objs, key) => ({
                    'name': key,
                    'quantity': _.sumBy(objs, 'quantity')
                })).orderBy('name')
                .value();
            this.messageSource.next(_.map(a).map(function (x) {
                return Object.assign(new Material, x);
            }));
        }


    }

    updateArmor(armors: Armor[]) {

    }
}