import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnewsNoticebrdDlyntesComponent } from './enews-noticebrd-dlyntes.component';

describe('EnewsNoticebrdDlyntesComponent', () => {
  let component: EnewsNoticebrdDlyntesComponent;
  let fixture: ComponentFixture<EnewsNoticebrdDlyntesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnewsNoticebrdDlyntesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnewsNoticebrdDlyntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
