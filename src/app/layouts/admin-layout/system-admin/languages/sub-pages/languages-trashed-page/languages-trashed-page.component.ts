import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-languages-trashed-page',
  templateUrl: './languages-trashed-page.component.html',
  styleUrls: ['./languages-trashed-page.component.scss']
})
export class LanguagesTrashedPageComponent implements OnInit {

  private readonly resourcePath: string = 'system/languages';

  public readonly tableSettings: any = {
    showPagination: true,
    showSizeChanger: true,
    frontendPagination: false,
    size: 'small',
    loading: false
  };

  // Paginations Properties
  public totalItems: number = 0;
  public pageNumber: number = 1;
  public resultsPerPage: number = 10;

  // Table Data
  public items: any[] = [];

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

  // For Filtered Title Text
  public showFilteredTitle: boolean = false;
  public filteredTitleText: string = '';

  private items$: Subscription = new Subscription();
  private itemUpdate$: Subscription = new Subscription();

  constructor(
    private _CDR: ChangeDetectorRef, 
    private _dataService: DataService, 
    private _languageService: LanguageService,
    private _nzNotificationService: NzNotificationService,
  ) { }

  ngOnChanges(): void {
    this.getDataByDefault();
    this._CDR.detectChanges();
  }

  ngAfterContentChecked(): void {
    this._CDR.detectChanges();
  }

  ngOnInit(): void {
    this.getDataByDefault();
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.itemUpdate$.unsubscribe();
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

  public getDataBySearch = async ($event) => {
    const searchTerm: string = $event;
    if(searchTerm != '') {
      const columns: string = 'id,name,code,active_language,deleted_by,deleted_at';
      const queryString: string = '?' 
                                  + 'columns=' + columns 
                                  + '&limit=' + this.resultsPerPage 
                                  + '&page=' + this.pageNumber 
                                  
                                  + '&search=' + searchTerm;
      const praparedPath: string = this.resourcePath + '/trashed' + queryString;
      this.getData(praparedPath);
      this.showFilteredTitle = true;
      this.filteredTitleText = 'Searched Items with keyword : "' + searchTerm + '"';
    } else {
      this.showFilteredTitle = false;
      this.filteredTitleText = '';
      this.getDataByDefault();
    }
  }

  public getDataByDefault = async () => {
    this.showFilteredTitle = false;
    this.filteredTitleText = '';
    const columns: string = 'id,name,code,active_language,deleted_by,deleted_at';
    const queryString: string = '?' 
                                + 'columns=' + columns 
                                + '&limit=' + this.resultsPerPage 
                                + '&page=' + this.pageNumber;
    const praparedPath: string = this.resourcePath + '/trashed' + queryString;
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

  public onRestoreLanguage = async (id: number) => {
    const preparedPath: string = this.resourcePath + '/restore/' + id;
    this.itemUpdate$ = this._dataService.post({}, preparedPath).subscribe(async (response) => {
      if(response != undefined) {
        if(response.code == 200) {
          this.getDataByDefault();
        }
      }
    });
  }

  public onDeleteCancel = () => {
    return;
  }

  public onPermanentlyDeleteLanguage = async (id: number) => {
    this._languageService.deleteParmanently(id).subscribe((response: any) => {
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
  

}
