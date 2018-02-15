import { Component, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";


@Component({
    selector: 'toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ]
})
export class ToggleComponent implements ControlValueAccessor {

    private _value: boolean;

    get value(): boolean {
        return this._value;
    }


    set value(value: boolean) {
        if (this._value !== value) {
            this._value = value;
            this.propagateChange(value);
        }
    }

    writeValue(obj: any): void {
        if (obj !== undefined && obj !== null) {
            this.value = obj;
        }
    }
    propagateChange = (_: any) => { };
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {

    }

    @Input() label: string;

    public inputId: string = Math.random().toString(36).substr(2, 10);

}