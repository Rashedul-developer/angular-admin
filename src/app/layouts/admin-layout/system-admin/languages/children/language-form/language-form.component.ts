import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime, map } from 'rxjs/operators';
import { DataService } from 'src/app/services';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {

  @Input() mode?: string;
  @Input() object?: any;

  private resourcePath: string = 'system/languages';

  public showForm: boolean = false;

  // Submit Boolean
  public showLoaderSubmitting: boolean = false;

  // Main Form
  public mainForm!: FormGroup;

  

  public localizedNames: FormArray;
  public fromGroup = new FormGroup({});

  public formArray: FormArray;

  public form: FormGroup;

  public formD: FormGroup;

  public controlName: FormControl;
  public controlCode: FormControl;
  public controlActive: FormControl;

  private controls: any;

  public languages: any[] = [];
  supportedLocales = [
    { lang: { locale: 'en-US' } },
    { lang: { locale: 'en-FR' } },
  ];

  private languages$: Subscription = new Subscription();
  private codeExists$: Subscription = new Subscription();
  
  public languagesControlsAdded: boolean = false;

  constructor(
    //public _SharerService: SharerService, 
    private _dataService: DataService,
    private _nzNotificationService: NzNotificationService,
    public _languageService: LanguageService,
    public translate: TranslateService,
    private fb: FormBuilder
  ) 
  { 
    //let language_code:string = this._la
    //this._languageService.activeLanguages();
    // nguageService.getLanguage();
    //this.languageCodeParam = '?lang=' + language_code;
  }

  onAddLocalizedName(name: string, initialValue: string, validations: any[]) {
    
    this.fromGroup.addControl(name, new FormControl(initialValue, validations));
    this.localizedNames.push(this.fromGroup);
  }

  createItem(): FormGroup {
    return this.fb.group({
      id: null,
      name: ''
    })
  }

  ngOnInit(): void {
    // this.getLanguages();

    this.mainForm = this.fb.group({
      localizes: this.fb.array([this.createItem()])
    });



    // this.localizedNames = new FormArray([]);

    // this.mainForm = this.fb.group({
    //   localizedNames: this.localizedNames,
    //   controlCode: new FormControl(''),
    //   controlActive: new FormControl('')
    // });

    // this.onAddLocalizedName('controlName-0', '', [Validators.required]);
    // this.onAddLocalizedName('controlName-1', '', [Validators.required]);
    // this.onAddLocalizedName('controlName-2', '', [Validators.required]);
    // this.onAddLocalizedName('controlName-3', '', [Validators.required]);



    this.formArray = new FormArray([
      new FormGroup({
        controlName: new FormControl(''),
      })
    ]);

    this.createFormControls();
    this.createForms();

    this.formD = this.fb.group({
      template: ['default', [Validators.required]],
      is_home: [0],
      translatable: this.fb.array(this.supportedLocales.map(locale => this.getFormGroupForLocale(locale)))
    });

  
  }

  get localizedItems() {
    return this.mainForm.controls['localizes'] as FormArray;
  }

  addFormGroup() {
    this.formArray.push(new FormGroup({
      controlName: new FormControl(''),
    }))
  }

  ngOnDestroy(): void {
      this.languages$.unsubscribe();
      this.codeExists$.unsubscribe();
  }

  createFormControls() {
    this.controlName = new FormControl('', [Validators.required]);
    this.controlCode = new FormControl('', [Validators.required], [this.codeAsyncValidator]);
    this.controlActive = new FormControl(false, []);

    let moreControls: FormControl[] = [];

    

    this.controls = {
      controlName: this.controlName,
      controlCode: this.controlCode,
      controlActive: this.controlActive,
    };
  }

  private createForms = async () => {
    this.form = new FormGroup(this.controls);
    //await this.localizedControls();
    
  }

  private localizedControls = async () => {
    this._languageService.getLanguages().subscribe(async (response: any) => {
      if(response != undefined) {
        if(response.code == 200) {
          let languages = [];
          await response.data.data.forEach(async (element: any) => {
              languages.push(await element.code);
          });
          languages.forEach(async element => {
            
             this.form.addControl('controlName' + element, new FormControl('', [Validators.required]));
          });
          this.languagesControlsAdded = true;
        }
      }
    });
  }


  private getFormGroupForLocale(language) {
    return this.fb.group({
      controlName: [language.lang.locale + 'Name', [Validators.required]]
    });
  }
  get localeFormArray() {
    return (<FormArray>this.form.get('translatable')).controls;
  }

  async onSubmit() {
    let formData = {
      name: this.form.controls['controlName'].value,
      code: this.form.controls['controlCode'].value,
      active: this.form.controls['controlActive'].value,
    };
    


    this._languageService.add(formData).subscribe((response: any) => {
      if(response != undefined) {
        if(response.code == 201) {
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
          this.reset();
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

  reset(): void {
    
    this.form.reset();
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].markAsPristine();
        this.form.controls[key].updateValueAndValidity();
      }
    }

    this.showLoaderSubmitting = false;

    //this._SharerService.broadcast('triggerResetDetails');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public codeAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      const praparedPath: string = this.resourcePath + '/exists' + '?code=' + control.value;
      this.codeExists$ = this._dataService.getJson(praparedPath, '').subscribe(async (response) => {
        if(response != undefined) {
          if(response.data) {
            // you have to return `{error: true}` to mark it as an error event
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        }
      });
    });

  getControlName(control: AbstractControl): string {
    const formGroup = control.parent.controls;
    return Object.keys(formGroup).find(name => control === formGroup[name]) || null;
  }

  public loadingComponent: boolean = false;

  private onSet = async () => {
    if(this.object != undefined) {
      this.loadingComponent = true;
      this.loadingComponent = false;
    }
  }


  // Database Calls ========================================================

  private getLanguages = async () => {
    this.loadingComponent = true;
    const praparedPath: string = 'admin/shipping/languages/active';
    this.languages$ = this._dataService.getJson(praparedPath, '').subscribe(async (response) => {
      if(response != undefined) {
        if(response.code == 200) {
          this.languages = await response.data;
          this.loadingComponent = false;
        }
      }
    });
  }

  private postResource = async (postData: any) => {
    this.showLoaderSubmitting = true;
    const praparedPath: string = 'admin/shipping/areas';
    
    // this.areasPost$ = this._dataService.postJson(praparedPath, JSON.stringify(await postData)).subscribe(async (response) => {
    //   if(response != undefined) {
    //     if(response.code == 201) {
    //       this._nzNotificationService.success(
    //         'Success', 
    //         response.message,
    //         {
    //           nzStyle: {
    //             marginTop: '15%',
    //             backgroundColor: '#f6ffed'
    //           }
    //         }
    //       );
    //       //this._SharerService.broadcast('triggerResetDetails');
    //       this.reset();
    //       this.resetShows();
    //       this.showLoaderSubmitting = false;
    //     } else {
    //       this._nzNotificationService.error(
    //         'Failed', 
    //         response.message, 
    //         {
    //           nzStyle: {
    //             marginTop: '15%',
    //             backgroundColor: '#fff2f0'
    //           }
    //         }
    //       );
    //       this.showLoaderSubmitting = false;
    //     }
    //   }
    // });
  }

}
