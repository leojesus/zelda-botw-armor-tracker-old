export class ArmorFilter {
    name: string;
    onlyObtained: boolean;
    onlyNotFullyUpgraded: boolean;
    hideAmiibo: boolean;
    hideDlc: boolean;
    onlyNotObtained: boolean;

    constructor() {
        this.name = '';
        this.onlyObtained = false;
        this.onlyNotFullyUpgraded = false;
        this.hideAmiibo = false;
        this.hideDlc = false;
        this.onlyNotObtained = false;
    }
}