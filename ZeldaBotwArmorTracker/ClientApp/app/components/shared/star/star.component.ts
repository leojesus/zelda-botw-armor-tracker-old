import { Component, Input, OnChanges, Output, EventEmitter, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";


@Component({
    selector: 'armor-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StarComponent),
            multi: true
        }
    ]
})
export class StarComponent implements  ControlValueAccessor {
    writeValue(obj: any): void {
        if (obj !== undefined && obj !== null) {
            this.level = obj;
            this.starList = [];
            for (let i: number = 0; i < this.maxLevel; i++) {
                let current: StarSelect = new StarSelect();
                current.id = i;
                if (this.level > i)
                    current.selected = true;
                else
                    current.selected = false;

                current.tempSelected = current.selected
                this.starList.push(current);
            }
        }
    }
    propagateChange = (_: any) => { };
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {

    }

    public level: number;
    @Output() public notify: EventEmitter<number> = new EventEmitter<number>();
    @Input() disable: boolean;

    private maxLevel: number = 4;
    public starList: StarSelect[] = [];

    mouseover(id: number) {
        if (!this.starList[id].tempSelected)
            this.starList[id].tempSelected = !this.starList[id].tempSelected;
        for (let i: number = 0; i < id; i++) {
            this.starList[i].tempSelected = true;
        }
        for (let i: number = id + 1; i < this.starList.length; i++) {
            this.starList[i].tempSelected = false;
        }
    }

    mouseout(id: number) {
        for (let i: number = 0; i < this.starList.length; i++) {
            this.starList[i].tempSelected = this.starList[i].selected;
        }
    }

    click(id: number) {

        if (id == 0 && this.starList[0].selected && !this.starList[1].selected) {
            this.starList[0].selected = false;
            this.propagateChange(0);

        }
        else {
            for (let i: number = 0; i < this.starList.length; i++) {
                this.starList[i].selected = false;
            }

            for (let i: number = 0; i <= id; i++) {
                this.starList[i].selected = true;
            }

            let level: number;
            level = id + 1;
            this.propagateChange(level);
        }
    }
}

export class StarSelect {
    id: number;
    selected: boolean;
    tempSelected: boolean;
}