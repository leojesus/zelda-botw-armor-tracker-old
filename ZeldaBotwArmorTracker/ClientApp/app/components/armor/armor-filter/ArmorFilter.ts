export class ArmorFilter {
    name: string;
    onlyObtained: boolean;
    onlyNotFullyUpgraded: boolean;

    constructor() {
        this.name = '';
        this.onlyObtained = false;
        this.onlyNotFullyUpgraded = false;
    }
}