import { Injectable } from '@angular/core';
import { MultipleChceQtnModel } from '../app/multiple-chce-qtn-model'

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  public storage:any;
  public questionHeaderDetails:any;
  public multipleChoiceQtnModel:MultipleChceQtnModel
  public isUpdate:boolean;
  constructor() { }
}
