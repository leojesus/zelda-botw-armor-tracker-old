import { Material } from "./Material";
import * as _ from "lodash";

export class Armor {
    name: string;
    setName: string;
    imagePath: string;
    obtained: boolean = false;
    isUpgradable: boolean;
    amiiboRelated: boolean;
    private _currentLevel: number = 0;
    listOfUpgradeMaterials: Material[];
    groupedMaterials: Material[];

    get externalLink(): string {
        return "https://www.zeldadungeon.net/wiki/" + this.name.replace(" ", "_");
    }

    get currentLevel(): number {
        return this._currentLevel;
    }
    set currentLevel(value: number) {
        this._currentLevel = value;
        this.updateGroupedMaterials();
    }

    public updateGroupedMaterials() {
        let currentLevel = this.currentLevel;
        var output =
            _(this.listOfUpgradeMaterials)
                .filter(function (o) { return o.forLevel > currentLevel })
                .groupBy('name')
                .map((objs, key) => ({
                    'name': key,
                    'quantity': _.sumBy(objs, 'quantity')
                }))
                .value();
        this.groupedMaterials = _.map(output).map(function (x) {
            return Object.assign(new Material, x);
        });
    }

    constructor() {
    }
}