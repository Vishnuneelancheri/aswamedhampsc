import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionSetComponent } from './show-question-set.component';

describe('ShowQuestionSetComponent', () => {
  let component: ShowQuestionSetComponent;
  let fixture: ComponentFixture<ShowQuestionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQuestionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
