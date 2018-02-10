export class ArmorFilter {
    name: string;
    onlyObtained: boolean;
    onlyNotFullyUpgraded: boolean;
    hideAmiibo: boolean;

    constructor() {
        this.name = '';
        this.onlyObtained = false;
        this.onlyNotFullyUpgraded = false;
        this.hideAmiibo = false;
    }
}