import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditService, GridModule, ToolbarService,CommandColumnService  } from '@syncfusion/ej2-angular-grids';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationsComponent } from './applications/applications.component';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule, 
    HttpClientModule,
    DatePickerModule,
    FormsModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    EditService,
    ToolbarService,
    CommandColumnService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
