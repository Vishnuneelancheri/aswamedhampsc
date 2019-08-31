import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTestPanelComponent } from './mock-test-panel.component';

describe('MockTestPanelComponent', () => {
  let component: MockTestPanelComponent;
  let fixture: ComponentFixture<MockTestPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockTestPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
