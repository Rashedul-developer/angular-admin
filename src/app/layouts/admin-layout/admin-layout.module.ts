import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../modules/material.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoNgZorroAntdModule } from '../../modules/ng-zorro-antd.module';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { SystemAdminComponent } from './system-admin/system-admin.component';
import { MatTabsModule } from "@angular/material/tabs";



@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutRoutingModule,
    NgxPaginationModule,
    MaterialModule,
    DemoNgZorroAntdModule,
    MatTabsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  declarations: [
    DashboardComponent,
    SystemAdminComponent,
  ],
  entryComponents: [
  ]
})
export class AdminLayoutModule { }
