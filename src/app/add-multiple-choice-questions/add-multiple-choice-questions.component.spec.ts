import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleChoiceQuestionsComponent } from './add-multiple-choice-questions.component';

describe('AddMultipleChoiceQuestionsComponent', () => {
  let component: AddMultipleChoiceQuestionsComponent;
  let fixture: ComponentFixture<AddMultipleChoiceQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultipleChoiceQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleChoiceQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
