import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubmenuComponent } from './manage-submenu.component';

describe('ManageSubmenuComponent', () => {
  let component: ManageSubmenuComponent;
  let fixture: ComponentFixture<ManageSubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSubmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
