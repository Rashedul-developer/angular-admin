import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../modules/material.module';
import {DemoNgZorroAntdModule} from '../../../modules/ng-zorro-antd.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SystemAdminRoutingModule} from './system-admin-routing.module';
import {CreateUserAddEditDialog, CreateUserComponent} from "./create-user/create-user.component";
import {RoleAssignComponent, RoleAssignDialog} from "./role-assign/role-assign.component";
import {RoleCreateComponent, RoleEditComponent, RoleManagementComponent} from "./role-management/role-management.component";
import { LanguagesComponent } from './languages/languages.component';
import { LanguageAddPageComponent } from './languages/sub-pages/language-add-page/language-add-page.component';
import { LanguageEditPageComponent } from './languages/sub-pages/language-edit-page/language-edit-page.component';
import { LanguageFormComponent } from './languages/children/language-form/language-form.component';

import { SmsProviderComponent, SmsProviderDialog } from './settings/sms-provider/sms-provider.component';
import { MailServiceProviderComponent, MailServiceProviderDialog } from './settings/mail-service-provider/mail-service-provider.component';
import { CreateMenuManagerAddEditModel, MenuManageComponent } from './menu-manage/menu-manage.component';
import { ElSearchInputComponent } from './languages/elements/el-search-input/el-search-input.component';
import { LanguagesTrashedPageComponent } from './languages/sub-pages/languages-trashed-page/languages-trashed-page.component';
import { TranslatorPageComponent } from './languages/sub-pages/translator-page/translator-page.component';
import { LoginNotifyComponent, LoginNotifyDialog } from './settings/login-notify/login-notify.component';
import { CommingSoonComponent } from './settings/comming-soon/comming-soon.component';
import { CreateNotificationDialog, NotificationListComponent } from './settings/notification-list/notification-list.component';
import { ChannelOperationTypeComponent, CreateChannelTypeDialog } from './settings/channel-operation-type/channel-operation-type.component';
import { MenuShiftManageComponent, MenuShiftModal } from './menu-shift-manage/menu-shift-manage.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        DemoNgZorroAntdModule,
        NgxPaginationModule,
        SystemAdminRoutingModule
    ],
    declarations: [
        CreateUserComponent,
        CreateUserAddEditDialog,
        RoleAssignComponent,
        RoleAssignDialog,
        RoleManagementComponent,
        RoleCreateComponent,
        RoleEditComponent,
        LanguagesComponent,
        LanguageAddPageComponent,
        LanguageEditPageComponent,
        LanguageFormComponent,
        SmsProviderComponent,
        SmsProviderDialog,
        MailServiceProviderComponent,
        MailServiceProviderDialog,
        MenuManageComponent,
        CreateMenuManagerAddEditModel,
        ElSearchInputComponent,
        LanguagesTrashedPageComponent,
        TranslatorPageComponent,
        LoginNotifyComponent,
        LoginNotifyDialog,
        CommingSoonComponent,
        NotificationListComponent,
        CreateNotificationDialog,
        ChannelOperationTypeComponent,
        CreateChannelTypeDialog,
        MenuShiftManageComponent,
        MenuShiftModal

    ],
    entryComponents: [
        CreateUserAddEditDialog,
        RoleAssignDialog,
        SmsProviderDialog,
        MailServiceProviderDialog,
        CreateMenuManagerAddEditModel,
        LoginNotifyDialog,
        CreateNotificationDialog,
        CreateChannelTypeDialog,
        MenuShiftModal
    ]
})
export class SystemAdminModule {
}

