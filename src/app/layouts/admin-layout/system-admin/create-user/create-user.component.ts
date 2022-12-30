import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from "../../../../services";
import {CommonService} from "../../../../services/common.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppError} from "../../../../core_classes/app-error";
import {BadInput} from "../../../../core_classes/bad-input";
import {Subscription} from "rxjs";

export interface DialogData {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    country_id: number;
    country_code: string;
    phone_number: string;
    alternate_country: number;
    alternate_country_code: string;
    alternate_phone: string;
    country_list: any;
    prefix_code: string;
    prefix_name: string;
    sequrity_code: string;
    status: any;
    save_type: string;
    role_id: number;
}

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
    public collection: any[] = [];
    public country_list: any[] = [];

    public notFoundMessage: string = '';
    public totalItems: number = 0;
    public pageNumber: number = 1;
    public resultPerPage: number = 10;
    public columnsSortBy: string = 'id';
    public searchValues: string = '';
    public dataOrderBy: boolean = true;
    public clickCount: number = 0;
    randCode = Math.floor((Math.random() * 1000000) + 1);

    private items$: Subscription = new Subscription();
    private countries$: Subscription = new Subscription();

    constructor(private dataService: DataService,
                private common: CommonService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getUserList();
        this.common.aClickedEvent.subscribe((data: string) => {
            this.getUserList();
        });
    }

    isAccess(type) {
      // permissions: {create: 1, edit: 1, update: 1, delete: 1}
      return this.common.checkPermissionAccess( 'CreateUserComponent', type)
    }

    ngOnDestroy(): void {
        this.items$.unsubscribe();
        this.countries$.unsubscribe();
    }

    getSl(i: number) {
        return (Number(this.resultPerPage) * (Number(this.pageNumber) - 1)) + i
    }

    changeResultPerPage(event: number) {
        this.pageNumber = 1;
        this.resultPerPage = event;
        this.getUserList();
    }

    pageChange(newPage: number) {
        this.pageNumber = newPage;
        this.getUserList();
    }

    searchByData(value: string) {
        this.searchValues = value;
        this.pageNumber = 1;
        this.resultPerPage = 10;
        this.dataOrderBy = true;
        this.getUserList();
    }

    sortBy(column: string) {
        if (this.columnsSortBy === column) {
            this.dataOrderBy = !this.dataOrderBy;
        } else {
            this.columnsSortBy = column;
        }
        this.getUserList();
    }

    getUserList() {
        this.common.onBufferEvent.emit(true);
        let orderBy: string;
        if (this.dataOrderBy === true) {
            orderBy = 'DESC';
        } else {
            orderBy = 'ASC';
        }
        this.notFoundMessage = '';
        const queryString = "?"
            + "search=" + this.searchValues
            + "&sort_column=" + this.columnsSortBy
            + "&sort_by=" + orderBy
            + "&per_page=" + this.resultPerPage
            + "&page=" + this.pageNumber + "";
        this.items$ = this.dataService.getJson('system/user/get', queryString)
            .subscribe(async (response) => {
                    this.common.onBufferEvent.emit(false);
                    if (response.code == 200) {
                        this.collection = await response.data.users.data;
                        this.totalItems = await response.data.users.total;
                    } else {
                        this.collection = [];
                        this.totalItems = 0;
                        this.notFoundMessage = 'No data found.'
                    }
                },
                (error: AppError) => {
                    if (error instanceof BadInput) {
                    } else {
                        throw error;
                    }
                }
            );

        const queryStringCountry = '';
        this.countries$ = this.dataService.getJson('country/active/all', queryStringCountry)
            .subscribe(async (response) => {
                    this.common.onBufferEvent.emit(false);
                    if (response.code == 200) {
                        this.country_list = await response.data.countries;
                    } else {
                        this.country_list = [];
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


    createUserDialog() {
        this.clickCount = Number(this.clickCount) + 1;
        if (this.clickCount < 2) {
            const dialogRef = this.dialog.open(CreateUserAddEditDialog, {
                width: "900px",
                data: {
                    id: null,
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    user_name: '',
                    email: '',
                    password: '',
                    country_id: 18,
                    country_code: '880',
                    phone_number: '',
                    alternate_country:  18,
                    alternate_country_code:  '880',
                    alternate_phone: '',
                    country_list: this.country_list,
                    prefix_code: this.randCode,
                    prefix_name: '',
                    sequrity_code: '',
                    role_id: '',
                    status: '1',
                    save_type: 'create'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.clickCount = 0;
            });
        }
    }

    updateUserDialog(itemData) {
        this.clickCount = Number(this.clickCount) + 1;
        if (this.clickCount < 2) {
            const dialogRef = this.dialog.open(CreateUserAddEditDialog, {
                width: "900px",
                data: {
                    id: itemData.id,
                    first_name: itemData.user_profile.first_name,
                    middle_name: itemData.user_profile.middle_name,
                    last_name: itemData.user_profile.last_name,
                    email: itemData.email,
                    password: '',
                    country_id: itemData.country_id,
                    country_code: itemData.phone_country.phone_code,
                    phone_number: itemData.phone_number,
                    alternate_country: itemData.alternate_country,
                    alternate_country_code: itemData.alternate_country?itemData.alt_phone_country.phone_code:'',
                    alternate_phone: itemData.alternate_phone,
                    country_list: this.country_list,
                    user_name: itemData.user_name,
                    prefix_code: itemData.prefix_code,
                    prefix_name: itemData.prefix_name,
                    sequrity_code: itemData.sequrity_code,
                    role_id: itemData.role_id,
                    status: itemData.status,
                    save_type: 'update'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.clickCount = 0;
            });
        }
    }

}

@Component({
    selector: 'app-create-user-dialog',
    templateUrl: './create-user-add-edit.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserAddEditDialog {
    public type:string = this.data.save_type;
    public submitButton: boolean = false;
    public role_collection: any[] = [];

    constructor(public dialogRef: MatDialogRef<CreateUserAddEditDialog>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                private dataService: DataService,
                public common: CommonService) {
        this.getRoles();
    }

    getRoles() {
        const queryStringRole = '';
        this.dataService.getJson('system/role/get/active/all', queryStringRole)
            .subscribe(async (response) => {
                    if (response.code == 200) {
                        this.role_collection = await response.data.roles;
                    } else {
                        this.role_collection = [];
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

    countryWisePhoneCode(event: number) {
        const countryCode = this.data.country_list.find((e) => e.id === event);
        this.data.country_code = (countryCode.phone_code);
    }
    countryWiseAltPhoneCode(event: number) {
        const countryCode = this.data.country_list.find((e) => e.id === event);
        this.data.alternate_country_code = (countryCode.phone_code);
    }

    changeStatus(event: boolean) {
        if (event == true) {
            this.data.status = '1'
        } else {
            this.data.status = '0'
        }
    }

    onsubmit() {
        this.common.onBufferEvent.emit(true);
        this.submitButton = true;
        const postData = {
            'id': this.data.id,
            'first_name': this.data.first_name,
            'middle_name': this.data.middle_name,
            'last_name': this.data.last_name,
            'email': this.data.email,
            'password': this.data.password,
            'country_id': this.data.country_id,
            'country_code': this.data.country_code,
            'phone_number': this.data.phone_number,
            'alternate_country': this.data.alternate_country,
            'alternate_country_code': this.data.alternate_country_code,
            'alternate_phone': this.data.alternate_phone,
            'prefix_code': this.data.prefix_code,
            'prefix_name': this.data.prefix_name,
            'sequrity_code': this.data.sequrity_code,
            'role_id': this.data.role_id,
            'status': this.data.status,
            'save_type': this.type,
            'user_name': this.data.user_name
        };

        if (this.type == 'create') {
            this.dataService.post(postData, 'system/user/post')
                .subscribe(async (response) => {
                        this.common.onBufferEvent.emit(false);
                        if (response.code === 200) {
                            this.submitButton = false;
                            this.dialogRef.close();
                            this.common.openSnackBar(response.message, 'Close', 'submit-success');
                            this.common.AClicked('component clicked');
                        } else if (response.code === 404) {
                            this.submitButton = false;
                            this.common.openSnackBar(response.message, 'Close', 'submit-warning');
                        }
                    },
                    (error: AppError) => {
                        if (error instanceof BadInput) {
                        } else {
                            throw error;
                        }
                    });
        } else if (this.type == 'update') {
            this.dataService.post(postData, 'system/user/update')
                .subscribe(async (response) => {
                        this.common.onBufferEvent.emit(false);
                        if (response.code === 200) {
                            this.submitButton = false;
                            this.dialogRef.close();
                            this.common.openSnackBar(response.message, 'Close', 'submit-success');
                            this.common.AClicked('component clicked');
                        } else if (response.code === 404) {
                            this.submitButton = false;
                            this.common.openSnackBar(response.message, 'Close', 'submit-warning');
                        }
                    },
                    (error: AppError) => {
                        if (error instanceof BadInput) {
                        } else {
                            throw error;
                        }
                    });
        }
    }

}

