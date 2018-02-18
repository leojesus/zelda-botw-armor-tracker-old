import { Component, OnInit, Inject } from '@angular/core';
import * as _ from "lodash";
import * as $ from "jquery";
import { Http } from '@angular/http';
import { AnalyticsService } from '../analytics/analytics.service';
import { ArmorMaterialService } from './armor-material.service';
import { ArmorFilterService } from './armor-filter/armor-filter.service';
import { Armor } from './Armor';
import { JsonObject, JsonProperty, JsonConvert } from "json2typescript";
import { Material } from './Material';


@Component({
    selector: 'armor-list',
    templateUrl: './armor-list.component.html',
    styleUrls: ['./armor-list.component.css']
})
export class ArmorListComponent implements OnInit {

    constructor(private _http: Http,
        @Inject('BASE_URL') _baseUrl: string,
        private _analyticsService: AnalyticsService,
        private data: ArmorMaterialService,
        private _armorFilterService: ArmorFilterService) {
        this.baseUrl = _baseUrl;
    }

    ngOnInit(): void {

        let userArmorJson: string = <string>localStorage.getItem("armors");
        let userArmorList: UserArmor[] = JSON.parse(userArmorJson);

        let apiUrl = './armor.json?vaswr=sa98944s';
        this._http.get(this.baseUrl + apiUrl).subscribe(result => {
            this.armorList = result.json() as Armor[];
            console.log('leu');
            this.armorList = _.orderBy(this.armorList, 'name');
            userArmorList = _.orderBy(userArmorList, 'name');
            _.merge(this.armorList, userArmorList);
            console.log('mergeou');
            this.armorList = _.map(this.armorList).map(function (x) {
                let armor: Armor = Object.assign(new Armor, x);
                armor.updateGroupedMaterials();
                armor.updateMaterialsByLevel();

                armor.listOfUpgradeMaterials = _.map(x.listOfUpgradeMaterials).map(function (mat) {
                    return Object.assign(new Material, mat);
                });


                return armor;
            });
            this.armorList = _.orderBy(this.armorList, ['isUpgradable', 'name'], ['desc', 'asc']);
            this.filteredArmorList = this.armorList;
            let filteredArmor = <Armor[]>_(this.armorList)
                .filter(function (o) { return o.isUpgradable && o.obtained }).value();
         //   this.data.changeMessage(filteredArmor);
            console.log('retornou');
        }, error => console.error(error));


        this._armorFilterService.currentMessage.subscribe(message => {
            this.filteredArmorList = _.filter(this.armorList, function (item) {
                return item.name.toUpperCase().indexOf(message.name.toUpperCase()) > -1
                    && (!message.onlyObtained || item.obtained)
                    && (!message.hideAmiibo || !item.amiiboRelated)
                    && (!message.hideDlc || !item.dlcRelated)
                    && (!message.onlyNotObtained || !item.obtained)
                    && (!message.onlyNotFullyUpgraded || (item.currentLevel < 4 && item.isUpgradable));
            });
        });
    }

    private baseUrl: string;
    public armorList: Armor[];
    public filteredArmorList: Armor[];

    saveInfo() {

        var result = JSON.stringify(this.armorList, function (key, val) {
            let property: string = key;
            if ((property !== 'imagePath') && (property !== 'setName')
                && (property !== 'isUpgradable') && (property !== 'listOfUpgradeMaterials')
                && (property !== 'amiiboRelated')
                && (property !== 'dlcRelated')
                && (property !== 'listOfUpgradeMaterials')
                && (property !== 'groupedMaterials'))
                return val;
        });
        localStorage.setItem("armors", result);
    }

    changeObtained(armor: Armor) {
        console.log('obtained');
        if (armor.obtained) {
            this._analyticsService.armorObtained(armor.name);
        } else {
            this._analyticsService.armorUnobtained(armor.name);
        }
        let filteredArmor = <Armor[]>_(this.armorList)
            .filter(function (o) { return o.isUpgradable && o.obtained }).value();
        this.data.changeMessage(filteredArmor);
        this.saveInfo();
    }

    changeLevel(armor: Armor) {
        this._analyticsService.armorChangeLevel(armor.name, armor.currentLevel);
        let filteredArmor = <Armor[]>_(this.armorList)
            .filter(function (o) { return o.isUpgradable && o.obtained }).value();
        this.data.changeMessage(filteredArmor);
        this.saveInfo();
    }

    changeMaterialDisplayToAll(armor: Armor, idx: number) {
        if (!armor.showTotalMaterials) {
            armor.showTotalMaterials = true;
            this._analyticsService.materialToDisplayTotal(armor.name);
            this.saveInfo();
            $('#all-materials-' + idx).tab('show');
        }
    }

    changeMaterialDisplayToByLevel(armor: Armor, idx: number) {
        if (armor.showTotalMaterials) {
            armor.showTotalMaterials = false;
            this._analyticsService.materialToDisplayByLevel(armor.name);
            this.saveInfo();
            $('#by-level-' + idx).tab('show');
        }
    }

    showMaterialsByLevel(armor: Armor) {
        armor.showTotalMaterials = false;
    }

    showAllMaterials(armor: Armor) {
        armor.showTotalMaterials = true;
    }
}

export class UserArmor {
    name: string;
    obtained: boolean;
    currentLevel: number;

    public constructor(
        fields?: {
            name: string,
            obtained?: boolean,
            currentLevel?: number,
        }) {
        if (fields) Object.assign(this, fields);
    }
}