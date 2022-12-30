import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageEditPageComponent } from './language-edit-page.component';

describe('LanguageEditPageComponent', () => {
  let component: LanguageEditPageComponent;
  let fixture: ComponentFixture<LanguageEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
