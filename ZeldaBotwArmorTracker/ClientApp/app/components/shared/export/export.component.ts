import { Component } from "@angular/core";
import 'rxjs/Rx';
import { ImportService } from "./import.service";
import { AnalyticsService } from "../../analytics/analytics.service";


@Component({
    selector: 'export-armor',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.css']
})
export class ExportComponent {

    constructor(private _importService: ImportService,
        private _analyticsService: AnalyticsService) { }

    downloadFile() {
        var text: string = <string>localStorage.getItem("armors");
        text = btoa(text);
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', "BOTW Armor Tracker.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
        this._analyticsService.exportFile();
    }

    resetInfo() {
        if (confirm('Are you sure you want to reset your information? Your current modifications will be lost.')) {
            localStorage.removeItem("armors");
            this._analyticsService.resetSettings();
            window.location.reload();
        }
    }

    openFile(event: any) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = () => {
            if (confirm('Are you sure you want to import a new file? Your current modifications will be lost.')) {
                this._importService.importFileContent(reader.result);
            }
        }
        reader.readAsText(input.files[0]);
    }
}
