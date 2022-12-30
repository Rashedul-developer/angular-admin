import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../classes/auth-guard';
import {CreateUserComponent} from "./create-user/create-user.component";
import { LanguagesComponent } from './languages/languages.component';
import { LanguageAddPageComponent } from './languages/sub-pages/language-add-page/language-add-page.component';
import { LanguageEditPageComponent } from './languages/sub-pages/language-edit-page/language-edit-page.component';
import { LanguagesTrashedPageComponent } from './languages/sub-pages/languages-trashed-page/languages-trashed-page.component';
import { TranslatorPageComponent } from './languages/sub-pages/translator-page/translator-page.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import {
    RoleCreateComponent,
    RoleEditComponent,
    RoleManagementComponent
} from "./role-management/role-management.component";
import { CommingSoonComponent } from './settings/comming-soon/comming-soon.component';
import { LoginNotifyComponent } from './settings/login-notify/login-notify.component'; 
import { MailServiceProviderComponent } from './settings/mail-service-provider/mail-service-provider.component';
import { SmsProviderComponent } from './settings/sms-provider/sms-provider.component';
import { NotificationListComponent } from './settings/notification-list/notification-list.component';
import { ChannelOperationTypeComponent } from './settings/channel-operation-type/channel-operation-type.component';
import { MenuShiftManageComponent } from './menu-shift-manage/menu-shift-manage.component';
const routes: Routes = [
    {
        path: 'system',
        data: {
            title: 'System Users',
        },
        children: [
            {path: 'user', component: CreateUserComponent, canActivate: [AuthGuard]},
            // {path: 'role-assign', component: CreateUserComponent, canActivate: [AuthGuard]},
            {path: 'role-list', component: RoleManagementComponent, canActivate: [AuthGuard]},
            {path: 'role-create', component: RoleCreateComponent, canActivate: [AuthGuard]},
            {path: 'role-edit/:id', component: RoleEditComponent, canActivate: [AuthGuard]},
            {path: 'menu-manage', component: MenuManageComponent, canActivate: [AuthGuard]},
            {
                path: 'languages',
                component: LanguagesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'languages/add',
                component: LanguageAddPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'languages/edit/:id',
                component: LanguageEditPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'languages/trash',
                component: LanguagesTrashedPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'languages/translator',
                component: TranslatorPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'sms-provider',
                component: SmsProviderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'mail-service-provider',
                component: MailServiceProviderComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'channel-list',
                component: LoginNotifyComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'notification-list',
                component: NotificationListComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'channel-type',
                component: ChannelOperationTypeComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'shift-menu',
                component: MenuShiftManageComponent,
                canActivate: [AuthGuard],
            }
            
        ]
    },{
        path: 'comming-soon',
        component: CommingSoonComponent
    }


];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemAdminRoutingModule {
}
