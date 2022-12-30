import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageAddPageComponent } from './language-add-page.component';

describe('LanguageAddPageComponent', () => {
  let component: LanguageAddPageComponent;
  let fixture: ComponentFixture<LanguageAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
