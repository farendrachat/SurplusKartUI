import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports :[MatToolbarModule,MatIconModule,MatMenuModule],
    exports :[MatToolbarModule,MatIconModule,MatMenuModule],
})
export class MaterialModule{ }