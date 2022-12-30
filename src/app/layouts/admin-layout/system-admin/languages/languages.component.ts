import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnChanges, OnDestroy, AfterContentChecked {

  private readonly resourcePath: string = 'system/languages';

  public readonly tableSettings: any = {
    showPagination: true,
    showSizeChanger: true,
    frontendPagination: false,
    size: 'small',
    loading: false
  };

  public readonly tableSettingsActive: any = {
    showPagination: true,
    showSizeChanger: true,
    frontendPagination: false,
    size: 'small',
    loading: false
  };

  // Paginations Properties
  public totalItems: number = 0;
  public totalItemsActive: number = 0;
  public pageNumber: number = 1;
  public pageNumberActive: number = 1;
  public resultsPerPage: number = 10;
  public resultsPerPageActive: number = 10;


  // Table Data
  public items: any[] = [];
  public itemsActive: any[] = [];

  public loadingActive: boolean = false;

  public columns: any[] = [
    {
      title: "#"
    },
    {
      title: "Name"
    },
    {
      title: "Flag"
    },
    {
      title: "Code"
    },
    {
      title: "Options"
    }
  ];

  public columnsActive: any[] = [
    {
      title: "#"
    },
    {
      title: "Name"
    },
    {
      title: "Flag"
    },
    {
      title: "Code"
    },
    {
      title: "Status"
    },
    {
      title: "Options"
    }
  ];

  // For Filtered Title Text
  public showFilteredTitle: boolean = false;
  public showFilteredTitleActive: boolean = false;
  public filteredTitleText: string = '';
  public filteredTitleTextActive: string = '';

  private items$: Subscription = new Subscription();
  private itemsActive$: Subscription = new Subscription();
  private itemUpdate$: Subscription = new Subscription();

  private languageCodeParam: string = '';

  public mockData: any[] = [
    
  ];

  constructor(
    private _CDR: ChangeDetectorRef, 
    private _dataService: DataService, 
    private _languageService: LanguageService,
    private _nzNotificationService: NzNotificationService,
  ) 
  { 
    
  }

  ngOnChanges(): void {
    this.getDataByDefault();
    this.getDataByDefaultActive();
    this._CDR.detectChanges();
  }

  ngAfterContentChecked(): void {
    this._CDR.detectChanges();
  }

  ngOnInit(): void {
    this.getDataByDefault();
    this.getDataByDefaultActive();
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.itemsActive$.unsubscribe();
  }

  // Pagination Methods
  pageIndexChange($event) {
    this.pageNumber = $event;
    this.getDataByDefault();
  }

  pageSizeChange($event) {
    this.resultsPerPage = $event;
    this.getDataByDefault();
  }

  pageIndexChangeActive($event) {
    this.pageNumberActive = $event;
    this.getDataByDefaultActive();
  }

  pageSizeChangeActive($event) {
    this.resultsPerPageActive = $event;
    this.getDataByDefaultActive();
  }

  // Database Calls
  public getActiveDataBySearch = async ($event: any) => {
    const searchTerm: string = $event;
    if(searchTerm != '') {
      const columns: string = 'id,name,code,active_language,active_by,active_date';
      const queryString: string = '?' 
                                  + 'columns=' + columns 
                                  + '&limit=' + this.resultsPerPageActive 
                                  + '&page=' + this.pageNumberActive 
                                  + '&search=' + searchTerm
                                  
                                  + '&filterBy=active_language'
                                  + '&filterValue=1';
      const praparedPath: string = this.resourcePath + queryString;
      this.getActiveData(praparedPath);
      this.showFilteredTitleActive = true;
      this.filteredTitleTextActive = 'Searched Items with keyword : "' + searchTerm + '"';
    } else {
      this.showFilteredTitleActive = false;
      this.filteredTitleTextActive = '';
      this.getDataByDefaultActive();
    }
  }

  public getDataBySearch = async ($event) => {
    const searchTerm: string = $event;
    if(searchTerm != '') {
      const columns: string = 'id,name,code,active_language,created_by,created_at,disable_by,disable_date';
      const queryString: string = '?' 
                                  + 'columns=' + columns 
                                  + '&limit=' + this.resultsPerPage 
                                  + '&page=' + this.pageNumber 
                                  
                                  + '&search=' + searchTerm;
      const praparedPath: string = this.resourcePath + queryString;
      this.getData(praparedPath);
      this.showFilteredTitle = true;
      this.filteredTitleText = 'Searched Items with keyword : "' + searchTerm + '"';
    } else {
      this.showFilteredTitle = false;
      this.filteredTitleText = '';
      this.getDataByDefault();
    }
  }

  public getDataByDefaultActive = async () => {
    this.showFilteredTitleActive = false;
    this.filteredTitleTextActive = '';
    const columns: string = 'id,name,code,active_language,active_by,active_date';
    const queryString: string = '?' 
                                + 'columns=' + columns 
                                + '&limit=' + this.resultsPerPage 
                                + '&page=' + this.pageNumber
                                
                                + '&filterBy=active_language'
                                + '&filterValue=1';
    const praparedPath: string = this.resourcePath + queryString;
    this.getActiveData(praparedPath);
  }

  public getDataByDefault = async () => {
    this.showFilteredTitle = false;
    this.filteredTitleText = '';
    const columns: string = 'id,name,code,active_language,created_by,created_at,disable_by,disable_date';
    const queryString: string = '?' 
                                + 'columns=' + columns 
                                + '&limit=' + this.resultsPerPage 
                                + '&page=' + this.pageNumber;
    const praparedPath: string = this.resourcePath + queryString;
    this.getData(praparedPath);
  }

  getData(praparedPath: string) {
    this.tableSettings.loading = true;
    this.items$ = this._dataService.getJson(praparedPath, '').subscribe(async (response) => {
   
      
      if(response != undefined) {
        if(response.code == 200) {
          this.items = await response.data.data;
          this.totalItems = await response.data.total;
  
          this.tableSettings.loading = false;
        }
      }
    });
  }

  getActiveData(praparedPath: string) {
    this.tableSettingsActive.loading = true;
    this.loadingActive = true;
    this.itemsActive$ = this._dataService.getJson(praparedPath, '').subscribe(async (response) => {
      if(response != undefined) {
        if(response.code == 200) {
          this.itemsActive = await response.data.data;
          this.totalItemsActive = await response.data.total;
          this.tableSettingsActive.loading = false;
          this.loadingActive = false;
        }
      }
    });
  }

  public onActiveLanguage = async (id: number) => {
    const preparedPath: string = this.resourcePath + '/' + id;
    const postData: any = {
      active_language: 1
    };
    this.itemUpdate$ = this._dataService.post(postData, preparedPath).subscribe(async (response) => {
      if(response != undefined) {
        if(response.code == 200) {
          this.getDataByDefault();
          this.getDataByDefaultActive();
        }
      }
    });
  }

  public onDisableLanguage = async (id: number) => {
    const preparedPath: string = this.resourcePath + '/' + id;
    const postData: any = {
      active_language: 0
    };
    this.itemUpdate$ = this._dataService.post(postData, preparedPath).subscribe(async (response) => {
      if(response != undefined) {
        if(response.code == 200) {
          this.getDataByDefault();
          this.getDataByDefaultActive();
        }
      }
    });
  }

  public onDeleteLanguage = async (id: number) => {
    this._languageService.delete(id).subscribe((response: any) => {
      if(response != undefined) {
        
        if(response.code == 200) {
          this.getDataByDefault();
          this._nzNotificationService.success(
            'Success', 
            response.message,
            {
              nzStyle: {
                marginTop: '15%',
                backgroundColor: '#f6ffed'
              }
            }
          );
        } else {
          this._nzNotificationService.error(
            'Failed', 
            response.message, 
            {
              nzStyle: {
                marginTop: '15%',
                backgroundColor: '#fff2f0'
              }
            }
          );
        }
      }
    });

    
  }

  public onDeleteCancel = async () => {
    
  }

}
