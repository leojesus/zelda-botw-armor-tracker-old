import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ArmorListComponent } from './components/armor/armor-list.component';
import { StarComponent } from './components/shared/star/star.component';
import { MaterialResultComponent } from './components/armor/material-result/material-result.component';
import { ArmorFilterComponent } from './components/armor/armor-filter/armor-filter.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ArmorListComponent,
        HomeComponent,
        StarComponent,
        MaterialResultComponent,
        ArmorFilterComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            //{ path: 'home', component: HomeComponent },
            //{ path: 'counter', component: CounterComponent },
            //{ path: 'fetch-data', component: FetchDataComponent },
            //{ path: 'armor-list', component: ArmorListComponent },
            //{ path: '**', redirectTo: 'home' }
            { path: 'home', component: ArmorListComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
