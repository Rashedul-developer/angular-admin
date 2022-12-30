import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {CommonService} from '../../services/common.service';
import {AppError} from "../../core_classes/app-error";
import {BadInput} from "../../core_classes/bad-input";

declare const $: any;

export const ROUTES = [];

export interface RoutersData {
    path: string;
    title: string;
    icon: string;
    class: string;
}

[]

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    mockDate: Date = new Date();
    menuItems = Array();
    // routes: RoutersData = []
    //tokenId =  'this.common.mycookie.bearertoken';
    rootUrl = this.common.rootUrl + 'uploads/';
    erroeMsg = '';
    rootIndex = 0;
    previousmembertype;
    currentmembertype;
    nextmembertype;
    currentmembertype2
    panelOpenState = false
    openMap: { [name: string]: boolean } = {
        'sub1': true,
        'sub2': false,
        'sub3': false,
        'sub4': false,
        'sub5': false,
        'sub6': false,
        'sub7': false,
        'sub8': false
    };

    userImageFile;
    menus = [];
    collection = [];
    activeLan = '';
    // menus = [
    //     {
    //         level: 1,
    //         path: '/dashboard',
    //         title: 'Dashboard',
    //         icon: 'dashboard',
    //         subvalue: 'sub1',
    //         open: this.openMap['sub1'],
    //         selected: false,
    //         disabled: false,
    //     },
    // {
    //     level: 1,
    //     title: 'Company',
    //     icon: 'team',
    //     subvalue: 'sub2',
    //     open: this.openMap['sub2'],
    //     selected: false,
    //     disabled: false,
    //     children: [
    //         {
    //             level: 2,
    //             title: 'Type Settings',
    //             icon: 'user',
    //             subvalue: 'sub3',
    //             open: this.openMap['sub3'],
    //             selected: false,
    //             disabled: false,
    //             children: [
    //                 {
    //                     level: 3,
    //                     title: 'Business Type',
    //                     path: '/company/types/business-type',
    //                     icon: 'user',
    //                     open: false,
    //                     selected: false,
    //                     disabled: false
    //                 },
    //             ]
    //         },
    //     ]
    // },
    //     {
    //         level: 1,
    //         title: 'System',
    //         icon: 'team',
    //         subvalue: 'sub2',
    //         open: this.openMap['sub2'],
    //         selected: false,
    //         disabled: false,
    //         children: [
    //             {
    //                 level: 2,
    //                 title: 'Users',
    //                 path: '/system/user',
    //                 icon: 'user',
    //                 open: false,
    //                 selected: false,
    //                 disabled: false
    //             },
    //             {
    //                 level: 2,
    //                 title: 'Role List',
    //                 path: '/system/role-list',
    //                 icon: 'user',
    //                 open: false,
    //                 selected: false,
    //                 disabled: false
    //             },
    //             {
    //                 level: 2,
    //                 title: 'Languages',
    //                 path: '/system/languages',
    //                 icon: 'user',
    //                 open: false,
    //                 selected: false,
    //                 disabled: false
    //             },
    //             {
    //                 level: 2,
    //                 title: 'Menu Manage',
    //                 path: '/system/menu-manage',
    //                 icon: 'user',
    //                 open: false,
    //                 selected: false,
    //                 disabled: false
    //             },
    // {
    //     level: 2,
    //     title: 'SMS Provider',
    //     path: '/system/sms-provider',
    //     icon: 'user',
    //     open: false,
    //     selected: false,
    //     disabled: false
    // },
    // {
    //     level: 2,
    //     title: 'Mail Service Provider',
    //     path: '/system/mail-service-provider',
    //     icon: 'user',
    //     open: false,
    //     selected: false,
    //     disabled: false
    // }
    //         ]
    //     },
    // ]

    constructor(public auth: AuthService, private dataservice: DataService, private common: CommonService, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.resetRoute();
        this.permittedMenus();
        this.menuItems = this.resetRoute().filter(menuItem => menuItem);
        this.common.aClickedEventMenu
            .subscribe((data: string) => {
                this.permittedMenus();
                //   this.resetRoute ();
                this.menuItems = this.resetRoute().filter(menuItem => menuItem);
            });


        // const new_color = localStorage.getItem('data-color');
        // document.querySelector('.sidebar').setAttribute('data-color', new_color);
        // if (new_color) {
        //   document.querySelector('.sidebar').setAttribute('data-color', new_color);
        // } else {
        //   document.querySelector('.sidebar').setAttribute('data-color', 'azure');
        // }

        //this.dashboarddata();
    }

    permittedMenus(){
        const getLan = localStorage.getItem("active_lang");
        if(getLan){
        this.activeLan = getLan;
        }
        else{
        this.activeLan = 'en';
        }
        const queryString = "?active_language="+this.activeLan+"";
        this.dataService.getJson('dynamic-menu-by-role', queryString)
            .subscribe(data => {
                    if (data.code == 200) {
                        let env = this.common.environmentObj
                        localStorage.removeItem(env.componentGroupPermission);
                        this.collection = data.data.permissions;
                        localStorage.setItem(env.componentGroupPermission, encodeURIComponent(JSON.stringify(this.collection)));
                        this.menus = JSON.parse(decodeURIComponent(localStorage.getItem(env.componentGroupPermission)));
                        localStorage.setItem(env.allComponentPermission, encodeURIComponent(JSON.stringify(data.data.all_componet_permission)));
                        /* this code is for comming soon page if path is comming-soon*/
                        this.menus.forEach(element => {
                            if(element.children){
                                element.children.forEach(child => {
                                    if(child.children){
                                        child.children.forEach(child2 => {
                                            

                                            if(child2.children){
                                                child2.children.forEach(child3 => {
                                                    const lastSegment = child3.path.split("/").pop();
                                                    if(lastSegment == 'coming-soon'){
                                                        child3.path = '/coming-soon';
                                                    }
                                                });
    
                                            }else{
                                                const lastSegment = child2.path.split("/").pop();
                                                if(lastSegment == 'coming-soon'){
                                                    child2.path = '/coming-soon';
                                                }
                                            }



                                           });
                                        
                                    }else{
                                        const lastSegment = child.path.split("/").pop();
                                        if(lastSegment == 'coming-soon'){
                                            child.path = '/coming-soon';
                                        }
                                    }
                                });
                            }
                        });
                        /* this code is for comming soon page if path is comming-soon*/

                    } else {
                        this.collection = [];
                    }
                },
                (error: AppError) => {
                    if (error instanceof BadInput) {
                    } else {
                        throw error;
                    }
                }
            );
        
    }

    logoutuser() {
        this.common.bearertoken = '';
        this.common.username = '';
        this.auth.logOut();
    }


    openHandler(value: string, indx: number, level: number): void {
        
        for (const key in this.openMap) {
            if (key !== value) {
                this.openMap[key] = false;
            } else {
                this.openMap[key] = true;
            }
        }
      
        if (level == 1) {
            this.rootIndex = indx;
            this.menus.forEach((element, inx) => {
                if (inx !== indx) {
                    element.open = false
                }
            });
        } else {
            if (level == 2) {
                this.menus.forEach((element, inx) => {
                    if (this.rootIndex == inx) {
                        element.children.forEach((eleme, ix) => {
                            if (ix !== indx) {
                                eleme.open = false
                            }
                        });
                    }
                });
            }
        }

    }


    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    resetRoute() {
        return [
            {
                path: '/dashboard',
                title: 'Dashboard',
                icon: 'dashboard',
                class: 'show_menu'
            },
            {
                title: 'Retailer Account',
                icon: 'supervisor_account',
                id: 'retailer-account',
                class: 'show_menu',
                subMenus: [
                    {
                        path: '/product-purchase-report',
                        title: 'Product Purchase Report',
                        icon: 'attach_money',
                        pageaccess: true
                    },
                    {
                        path: '/convert-point',
                        title: 'Convert Point',
                        icon: 'note_add',
                        class: '',
                        pageaccess: true
                    },
                    {
                        path: '/ip-stock-ledger',
                        title: 'IP Stock Ledger',
                        icon: 'note_add',
                        class: '',
                        pageaccess: true
                    },
                    {
                        path: '/consumer-team-list',
                        title: 'Consumer Team List',
                        icon: 'note_add',
                        class: '',
                        pageaccess: true
                    },
                    {
                        path: '/account-upgrade-request',
                        title: 'Account Upgrade Request',
                        icon: 'person_add',
                        pageaccess: true
                    },
                    {
                        path: '/upgrade-distributor-type',
                        title: 'Upgrade Distributor Type',
                        icon: 'note_add',
                        class: '',
                        pageaccess: true
                    },
                ]
            },
        ]
    }

}
