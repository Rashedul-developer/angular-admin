import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesTrashedPageComponent } from './languages-trashed-page.component';

describe('LanguagesTrashedPageComponent', () => {
  let component: LanguagesTrashedPageComponent;
  let fixture: ComponentFixture<LanguagesTrashedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagesTrashedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesTrashedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
