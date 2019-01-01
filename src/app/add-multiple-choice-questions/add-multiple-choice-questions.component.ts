import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service'
import { MultipleChceQtnModel } from '../multiple-chce-qtn-model' 
import { AllQtnsUnderHead} from '../all-qtns-under-head'
import { NetworkingareaService } from '../networkingarea.service';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { all } from 'q';
@Component({
  selector: 'app-add-multiple-choice-questions',
  templateUrl: './add-multiple-choice-questions.component.html',
  styleUrls: ['./add-multiple-choice-questions.component.css']
})
export class AddMultipleChoiceQuestionsComponent implements OnInit {
  public mltpleChce:MultipleChceQtnModel;
  public options:string[]= ["A","B","C","d"];
  public relationId:string;
  public questionName:string;
  public headerId:string;
  public headerName:string;
  public allQtnsUnderHead:AllQtnsUnderHead[] = [];
  public qtnId:number[] = [];
  public getQtnResponse:any;
  constructor( public dataShare:DataShareService, public router:ActivatedRoute,
    public networkArea:NetworkingareaService ) { }

  ngOnInit() { 
    //alert( this.dataShare.isUpdate );
    let sub:any = this.router.params.subscribe( params=>{
      this.headerId = params['headerId'];
      this.headerName = params['headerName'];
      this.loadQuestions( this.headerId );
    
    });
    this.mltpleChce = new MultipleChceQtnModel("","","","","","",);
     this.relationId = this.router.snapshot.params.relationId;
     this.questionName = this.router.snapshot.params.question;
  }
  public submit(){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let url = "AdminLoginAction/add_option_relation_qtn";
    let body:any = {  "user_id":adminId,"token":token, "qtn_header":this.headerId,
      "qtn":this.mltpleChce.question, "optn_a":this.mltpleChce.optionA, "optn_b":this.mltpleChce.optionB,
      "optn_c":this.mltpleChce.optionC, "optn_d":this.mltpleChce.optionD, "answer":this.mltpleChce.answer
    };
    console.log( JSON.stringify(body));
    this.networkArea.postData(body,  url )
    .subscribe( data=>{
      let response:any = data;
      alert( JSON.stringify( response ));
    }, error=>{});
  }
  public loadQuestions( headerid: string ){
    let url:string  = "AdminLoginAction/get_all_qtns_under_hdr";
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "header_id": headerid };
    this.networkArea.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        this.getQtnResponse = response;
        for( let i = 0; i< response.data.length; i++){
          let tempData:any = response.data[i]; 
          this.qtnId.push (tempData.qtn_id);
        }
        this.qtnId = Array.from( new Set(this.qtnId) );
        for( let i = 0; i < this.qtnId.length; i++ ){ 
          for( let j = 0; j < response.data.length; j++ ){
            let tempData:any = response.data[j];
            if( tempData.qtn_id == this.qtnId[i] ){ 
              let allQtnsUnderHead:AllQtnsUnderHead = new AllQtnsUnderHead(
                tempData.qtn_name, tempData.qtn_id, tempData.answr_option_id,
                tempData.qtun_header_id, tempData.option_id, tempData.option_value,
                tempData.option_tag
              );
              console.log(i)
              this.allQtnsUnderHead.push(allQtnsUnderHead);
              break;
            }

          }
          console.log( JSON.stringify(this.allQtnsUnderHead) );
        }
      } , error=>{}
    );
  }
  public setQtn( id:number ){
    let qtnSet:AllQtnsUnderHead[] = [];
    let answer:any;
    for( let i = 0; i < this.getQtnResponse.data.length; i++ ){
      let tempData:any = this.getQtnResponse.data[i];
      console.log( tempData.qtn_id +"-"+ id);
      if( tempData.answr_option_id == tempData.option_id ){
        answer = tempData.option_tag;
      }
      if( tempData.qtn_id == id ){
        let allQtnsUnderHead:AllQtnsUnderHead = new AllQtnsUnderHead(
          tempData.qtn_name, tempData.qtn_id, tempData.answr_option_id,
          tempData.qtun_header_id, tempData.option_id, tempData.option_value,
          tempData.option_tag
        );
        qtnSet.push(  allQtnsUnderHead );

      }
    }
    
    if( qtnSet.length > 0 ){
      this.mltpleChce.question = qtnSet[0].qtnName;
      this.mltpleChce.optionA = qtnSet[0].optionValue;
      this.mltpleChce.optionB = qtnSet[1].optionValue;
      this.mltpleChce.optionC = qtnSet[2].optionValue;
      this.mltpleChce.optionD = qtnSet[3].optionValue;
    }
    this.mltpleChce.answer = answer;
    
  }
}
