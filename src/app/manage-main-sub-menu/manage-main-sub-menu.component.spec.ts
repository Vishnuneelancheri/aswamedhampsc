import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMainSubMenuComponent } from './manage-main-sub-menu.component';

describe('ManageMainSubMenuComponent', () => {
  let component: ManageMainSubMenuComponent;
  let fixture: ComponentFixture<ManageMainSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMainSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMainSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
