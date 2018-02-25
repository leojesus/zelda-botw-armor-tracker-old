import { Injectable } from "@angular/core";
declare var dataLayer: any;

@Injectable()
export class AnalyticsService {

    armorObtained(armorName: string): void {
        this.sendDataToGa("armor-obtained", armorName);
    }

    armorUnobtained(armorName: string): void {
        this.sendDataToGa("armor-unobtained", armorName);
    }

    materialToDisplayByLevel(armorName: string): void {
        this.sendDataToGa("material-by-level", armorName);
    }

    materialToDisplayTotal(armorName: string): void {
        this.sendDataToGa("material-total", armorName);
    }

    importFile(): void {
        this.sendDataToGaWihtoutLabel("import-file");
    }

    exportFile(): void {
        this.sendDataToGaWihtoutLabel("export-file");
    }

    resetSettings(): void {
        this.sendDataToGaWihtoutLabel("reset-settings");
    }

    armorChangeLevel(armorName: string, level: number): void {
        this.sendDataToGaWithValue("armor-change-level", armorName, level);
    }

    private sendDataToGaWihtoutLabel(eventName: string): void {
        dataLayer.push({
            "event": eventName
        });
    }

    private sendDataToGa(eventName: string, label: string): void {
        dataLayer.push({
            "event": eventName,
            "label": label
        });
    }

    private sendDataToGaWithValue(eventName: string, label: string, value: number): void {
        dataLayer.push({
            "event": eventName,
            "label": label,
            "value": value
        });
    }
}