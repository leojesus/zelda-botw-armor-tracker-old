export class Material {
    name: string;
    quantity: number;
    forLevel: number;

    get externalLink(): string {
        return "https://www.zeldadungeon.net/wiki/" + this.name.replace(" ", "_");
    }
}