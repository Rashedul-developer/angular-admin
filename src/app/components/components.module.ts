import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../modules/material.module';
import { DemoNgZorroAntdModule } from '../modules/ng-zorro-antd.module';

@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DemoNgZorroAntdModule
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
