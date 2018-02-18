import { Pipe, PipeTransform } from "@angular/core";



@Pipe({ name: 'mapValues' })
export class MapValuesPipe implements PipeTransform {
    transform(value: any, args?: any[]): Object[] {
        let returnArray: any[] = [];

        value.forEach((entryVal: any, entryKey: any) => {
            returnArray.push({
                key: entryKey,
                val: entryVal
            });
        });

        return returnArray;
    }
}