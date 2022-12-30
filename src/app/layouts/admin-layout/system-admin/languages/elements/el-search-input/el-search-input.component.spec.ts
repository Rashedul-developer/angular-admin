import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElSearchInputComponent } from './el-search-input.component';

describe('ElSearchInputComponent', () => {
  let component: ElSearchInputComponent;
  let fixture: ComponentFixture<ElSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
