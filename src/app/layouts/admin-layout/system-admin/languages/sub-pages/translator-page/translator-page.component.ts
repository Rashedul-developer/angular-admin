import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-translator-page',
  templateUrl: './translator-page.component.html',
  styleUrls: ['./translator-page.component.scss']
})
export class TranslatorPageComponent implements OnInit, OnDestroy {

  private readonly resourcePath: string = 'system/languages';

  public items: any[] = [];
  public loading: boolean = false;
  public showLoaderSubmitting: boolean = false;

  private items$: Subscription = new Subscription();
  private itemsUpdate$: Subscription = new Subscription();

  public totalItems: number = 0;
  public resultsPerPage: number = 5;
  public pageNumber: number = 1;
  
  constructor(
    private _CDR: ChangeDetectorRef, 
    private _dataService: DataService, 
    private _languageService: LanguageService,
    private _nzNotificationService: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getDataByDefault();
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.itemsUpdate$.unsubscribe();
  }

  public onSubmit = async () => {
    this.showLoaderSubmitting = true;
    this.itemsUpdate$ = this._dataService.post(this.items, this.resourcePath + '/translations').subscribe(async (response) => {
      if(response != undefined) {
        if(response.code == 200) {
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
          this.showLoaderSubmitting = false;
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
          this.showLoaderSubmitting = false;
        }
      }
    });
  }

  public getDataByDefault = async () => {
    const columns: string = 'id,name,code';
    const queryString: string = '?' 
                                + 'columns=' + columns 
                                + '&limit=' + this.resultsPerPage 
                                + '&page=' + this.pageNumber
                                + '&sortBy=active_date'
                                + '&sortOrder=DESC';
    const praparedPath: string = this.resourcePath + '/translations' + queryString;
    this.getData(praparedPath);
  }

  getData(praparedPath: string) {
    var arr = [];
    var translations = [];
    this.loading = true;
    this.items$ = this._dataService.getJson(praparedPath, '').subscribe(async (response) => {
      
      if(response != undefined) {
        if(response.code == 200) {
          this.items = await response.data.data;
          this.totalItems = await response.data.total;
          this.loading = false;
        }
      }
    });
  }

}
