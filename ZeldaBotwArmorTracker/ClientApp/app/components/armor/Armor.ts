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
    materialsByLevel: Map<number, Material[]>;
    showTotalMaterials: boolean = false;
    dlcRelated: boolean;

    get externalLink(): string {
        return "https://www.zeldadungeon.net/wiki/" + this.name.replace(" ", "_");
    }

    get remainingLevelArray(): number[] {
        let remaining: number[] = [];
        for (let i: number = 4; i > this.currentLevel; i--) {
            remaining.unshift(i);
        }
        return remaining;
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

    public updateMaterialsByLevel() {

        this.materialsByLevel = new Map();
        for (let i: number = 1; i <= 4; i++) {

            let materialsForLevel = _(this.listOfUpgradeMaterials)
                .filter(function (o) { return o.forLevel == i })
                .value();
            materialsForLevel = _.map(materialsForLevel).map(function (x) {
                return Object.assign(new Material, x);
            });

            this.materialsByLevel.set(i, materialsForLevel);
        }
    }



    constructor() {
    }
}