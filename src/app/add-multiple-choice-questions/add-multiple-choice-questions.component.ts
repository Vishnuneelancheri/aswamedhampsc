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
  public options:string[]= ["A","B","C","D"];
  public relationId:string;
  public questionName:string;
  public headerId:string;
  public headerName:string;
  public allQtnsUnderHead:AllQtnsUnderHead[] = [];
  public qtnId:number[] = [];
  public getQtnResponse:any;
  public selectedQuestionId:number;
  public isUpdate: boolean;
  constructor( public dataShare:DataShareService, public router:ActivatedRoute,
    public networkArea:NetworkingareaService ) { }

  ngOnInit() { 
    //alert( this.dataShare.isUpdate );
    let sub:any = this.router.params.subscribe( params=>{
      this.headerId = params['headerId'];
      this.headerName = params['headerName'];
      this.loadQuestions( this.headerId );
    
    });
    this.mltpleChce = new MultipleChceQtnModel("","","","","","","");
     this.relationId = this.router.snapshot.params.relationId;
     this.questionName = this.router.snapshot.params.question;
  }
  public submit(){
    
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let url = "AdminLoginAction/add_option_relation_qtn";
    let body:any = {  "user_id":adminId,"token":token, "qtn_header":this.headerId,
      "qtn":this.mltpleChce.question, "optn_a":this.mltpleChce.optionA, "optn_b":this.mltpleChce.optionB,
      "optn_c":this.mltpleChce.optionC, "optn_d":this.mltpleChce.optionD, "answer":this.mltpleChce.answer,
      "anubandham":this.mltpleChce.anubandham
    };  
    if( this.selectedQuestionId != null && this.isUpdate == true){
      this.updateQuestion( body );
      return;
    }
    this.networkArea.postData(body,  url )
    .subscribe( data=>{
      let response:any = data; 
      alert( response.message);
      this.loadQuestions(this.headerId);
    }, error=>{});
  }
   
  public clearAll(){
    this.isUpdate = false;
    this.selectedQuestionId = null;

    this.mltpleChce.question = null;
    this.mltpleChce.optionA = null;
    this.mltpleChce.optionB = null;
    this.mltpleChce.optionC = null;
    this.mltpleChce.optionD = null;
    this.mltpleChce.anubandham = null;
  }
  public updateQuestion(  body:any ){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let url = "AdminLoginAction/edit_mltple_chce_qtn";
    
    body.admin_id = adminId;

    body.opt_a_id = this.mltpleChce.getOptionAid();
    body.opt_b_id = this.mltpleChce.getOptionBid();
    body.opt_c_id = this.mltpleChce.getOptionCid();
    body.opt_d_id = this.mltpleChce.getOptionDid();

    body.qstn_id = this.selectedQuestionId;

    this.networkArea.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        alert( response.message);
        this.loadQuestions( this.headerId)
      }, error=>{ alert( JSON.stringify(error.error))}
    );
    
  }
  public loadQuestions( headerid: string ){
    let url:string  = "AdminLoginAction/get_all_qtns_under_hdr";
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "header_id": headerid };
    this.networkArea.postData( body, url ).subscribe(
      data=>{
        this.allQtnsUnderHead = [];
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
                tempData.option_tag,tempData.anubandham, tempData.is_active 
              ); 
              this.allQtnsUnderHead.push(allQtnsUnderHead);
              break;
            }

          } 
        }
      } , error=>{}
    );
  }
  public setQtn( id:number ){
    this.isUpdate = true;
    this.selectedQuestionId = id;
    let qtnSet:AllQtnsUnderHead[] = [];
    let answer:any;
    let anubandham:string;
    for( let i = 0; i < this.getQtnResponse.data.length; i++ ){
      let tempData:any = this.getQtnResponse.data[i]; 
      if( tempData.answr_option_id == tempData.option_id && tempData.qtn_id == id ){
        answer = tempData.option_tag; 
      }
      if( tempData.qtn_id == id ){
        this.selectedQuestionId = id;
        let allQtnsUnderHead:AllQtnsUnderHead = new AllQtnsUnderHead(
          tempData.qtn_name, tempData.qtn_id, tempData.answr_option_id,
          tempData.qtun_header_id, tempData.option_id, tempData.option_value,
          tempData.option_tag, tempData.anubandham , tempData.is_active 
        );
        qtnSet.push(  allQtnsUnderHead );
        anubandham = tempData.anubandham;
      }
    }
    
    if( qtnSet.length > 0 ){
      this.mltpleChce.question = qtnSet[0].qtnName;
      this.mltpleChce.optionA = qtnSet[0].optionValue;
      this.mltpleChce.optionB = qtnSet[1].optionValue;
      this.mltpleChce.optionC = qtnSet[2].optionValue;
      this.mltpleChce.optionD = qtnSet[3].optionValue;

      this.mltpleChce.setOptionAid(qtnSet[0].optionId); 
      this.mltpleChce.setOptionBid(qtnSet[1].optionId); 
      this.mltpleChce.setOptionCid(qtnSet[2].optionId); 
      this.mltpleChce.setOptionDid(qtnSet[3].optionId); 
 
       
    } 
    this.mltpleChce.answer = answer;
    this.mltpleChce.anubandham = anubandham;
    
  }
  public enab_disab_qtn( qtnId:string, is_active:string ){
    let url:string  = "AdminLoginAction/enable_disable_mltple_chce_qtn";
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "header_id": this.headerId,"qtn_id":qtnId };

    if( is_active == "0" ){
      body.is_enable = "anything";
    } 
    this.networkArea.postData (body, url).subscribe(
      data=>{
        let response:any = data;
        alert( JSON.stringify(response.message) );
        this.loadQuestions(this.headerId);
      }, error=>{}
    );
  }
  
}
