import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataService} from '../../../../../services/data.service';
import {CommonService} from '../../../../../services/common.service';
import {AppError} from '../../../../../core_classes/app-error';
import {BadInput} from '../../../../../core_classes/bad-input';

export interface DialogData {
  id: number;
  token: string;
  mail_driver: any;
  mail_host: any;
  mail_port: any;
  mail_address: any;
  mail_username: any;
  mail_password: any;
  mail_encryption: any;
  remarks: any;
  status: any;
  save_type: string;
  operation: string;
}
@Component({
  selector: 'app-mail-service-provider',
  templateUrl: './mail-service-provider.component.html',
  styleUrls: ['./mail-service-provider.component.scss']
})
export class MailServiceProviderComponent implements OnInit {

  
  totalitem = 0;
  pageRequest = 1;
  itemPerPage = '15';
  errorMessage = '';
  searchValues: String = '';
  dataOrderBy = true;
  sortColumn = 'id';
  list = [];

  searchValuesUP: String = '';
  pageRequestUP = 1;
  itemPerPageUP = '15';
  totalitemUpdate = 0;
  sortColumnUP = 'id';
  updatelist = [];


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private dataService: DataService,
    public common: CommonService,) {
  }

  ngOnInit(): void {
    this.allInitialData();
    this.allInitialUpdatedData();
    this.common.aClickedEvent.subscribe((data: string) => {
      this.allInitialData();
      this.allInitialUpdatedData();
    });
  }

  changedPageItem(event) {
    this.pageRequest = 1;
    this.allInitialData();
    }
    
    pageChange(newPage: number) {
    this.pageRequest = newPage;
    this.allInitialData();
    }
    filter(value: string) {
      this.searchValues = value;
      this.pageRequest = 1;
      this.itemPerPage = '15';
      this.dataOrderBy = true;
      this.allInitialData();
    }
    
    clearFilter() {
      this.searchValues = '';
      this.pageRequest = 1;
      this.itemPerPage = '15';
      this.dataOrderBy = true;
      this.allInitialData();
    }
    
    
    sort(column: string) {
    if (this.sortColumn === column) {
    this.dataOrderBy = !this.dataOrderBy;
    } else {
    this.sortColumn = column;
    }
    this.allInitialData();
    }

  allInitialData() {
  let orderBy: string;
  if (this.dataOrderBy === true) {
  orderBy = 'DESC';
  } else {
  orderBy = 'ASC';
  }
  const postData = {
  'search': this.searchValues,
  'order': orderBy,
  'columns': this.sortColumn,
  'rowperpage' :  this.itemPerPage,
  'pagereqest' :  this.pageRequest,
  };
  this.allData(postData);
  }



  allData(postData) {
    this.dataService.post(postData, 'system/settings/mailprovider')
    .subscribe(data => {
    if (data.response === 200) {
    
      this.list = data.data;
      this.totalitem = data.totalitem;
    } else {
      this.list = data.data;
      this.totalitem = data.totalitem;
      this.common.openSnackBar(data.message, 'Close', 'submit-error');
    }
    },
    (error: AppError) => {
    if (error instanceof BadInput) {
      // tslint:disable-next-line: semicolon
    } else {
      throw error;
    }
    });
  }

  changedPageUpdate(event) {
    this.pageRequestUP = 1;
    this.allInitialUpdatedData();
    }
    
    pageChangeUpdate(newPage: number) {
    this.pageRequestUP = newPage;
    this.allInitialUpdatedData();
    }
  
    filter2(value: string) {
      this.searchValuesUP = value;
      this.pageRequestUP = 1;
      this.itemPerPageUP = '15';
      this.dataOrderBy = true;
      this.allInitialUpdatedData();
    }
  
    clearFilter2() {
      this.searchValuesUP = '';
      this.pageRequestUP = 1;
      this.itemPerPageUP = '15';
      this.dataOrderBy = true;
      this.allInitialUpdatedData();
    }
  
    sort2(column: string) {
      if (this.sortColumnUP === column) {
      this.dataOrderBy = !this.dataOrderBy;
      } else {
      this.sortColumnUP = column;
      }
      this.allInitialUpdatedData();
      }
    
    

  allInitialUpdatedData() {
  let orderBy: string;
  if (this.dataOrderBy === true) {
  orderBy = 'DESC';
  } else {
  orderBy = 'ASC';
  }
  const postData = {
  'search': this.searchValuesUP,
  'order': orderBy,
  'columns': this.sortColumnUP,
  'rowperpage' :  this.itemPerPageUP,
  'pagereqest' :  this.pageRequestUP,
  };
  this.allUpdateData(postData);
  }

  allUpdateData(postData) {
    this.dataService.post(postData, 'system/settings/mailproviderUpdateData')
    .subscribe(data => {
    if (data.response === 200) {
    
      this.updatelist = data.data;
      this.totalitemUpdate = data.totalitem;
    } else {
      this.updatelist = data.data;
      this.totalitemUpdate = data.totalitem;
      // this.common.openSnackBar(data.message, 'Close', 'submit-error');
    }
    },
    (error: AppError) => {
    if (error instanceof BadInput) {
      // tslint:disable-next-line: semicolon
    } else {
      throw error;
    }
    });
}

  getSL(i) {
  return (Number(this.itemPerPage) * (Number(this.pageRequest) - 1)) + i;
  }
  
  


  

/*
Add Info function
*/
  openDialog() {
    const dialogRef = this.dialog.open(MailServiceProviderDialog, {
    width: '60%',
      data: {
      id: '',
      mail_driver: '',
      mail_host: '',
      mail_port: '',
      mail_username: '',
      mail_address: '',
      mail_password: '',
      mail_encryption: '',
      remarks: '',
      status: '',
      save_type: 'create',
      
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /*
  Edit Info function
  */
  EditDialog(inputData) {
    const dialogRef = this.dialog.open(MailServiceProviderDialog, {
    width: '60%',
    data: {
      id:                    inputData.id,
      mail_driver:           inputData.mail_driver,
      mail_host:             inputData.mail_host,
      mail_port:             inputData.mail_port,
      mail_address:         inputData.mail_address,
      mail_username:         inputData.mail_username,
      mail_password:         inputData.mail_password,
      mail_encryption:       inputData.mail_encryption,
      remarks:               inputData.remarks,
      status:                inputData.status,
      save_type: 'update',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  
  }
/*
new bank info dialog
start from here
*/
@Component({
selector: 'mail-service-provider-dialog',
templateUrl: './mail-service-provider-dialog.html',
styles: ['.mat-form-field-appearance-outline .mat-form-field-label {top: 1.84375em !important;}']
})

export class MailServiceProviderDialog {
submitButtonEnable = false;
type = this.data.operation;


constructor(public dialogRef: MatDialogRef<MailServiceProviderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataService: DataService,
    private common: CommonService) {
}

ngOnInit() {
}


  // data submit function
  onsubmit() {
  this.submitButtonEnable = true;
  
  this.dataService.post(this.data, 'system/settings/mailproviderInsertData')
  .subscribe(data => {
  if (data.response === 200) {
    // this.submitButtonEnable = false;
    this.common.openSnackBar(data.message, 'Close', 'submit-info');
    this.dialogRef.close();
    this.common.AClicked('component clicked');
  } else if (data.response === 400) {
    this.submitButtonEnable = false;
    this.common.openSnackBar(data.message, 'Close', 'submit-error');
  }
  },
  (error: AppError) => {
  if (error instanceof BadInput) {
    // tslint:disable-next-line:semicolon
  } else {
    throw error;
  }
  });
  }
}


