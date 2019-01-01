import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service'
import { NetworkingareaService } from '../networkingarea.service';
import { Router,NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  public response :any [];
  public subMenu:any[];
  public qtnHeader:String;
  public addedQtnHeaders:any[];
  public selectedMainMenu:String;
  public size:any = 49; 
  public isMenu1Selected:boolean = false;
  public selectedText:String = "Nothing is selected";
  constructor( public dataShare:DataShareService, public networkArea:NetworkingareaService,
    public router:Router ) { }

  ngOnInit() {  
    // this.response = JSON.parse(window.localStorage.getItem("menu"));
    //  for( let i = 0; i < this.response.length; i++ ){
    //    this.response[i].btnBg = "white";
    //    this.response[i].sampleColor = "rgb(168, 168, 168)";
    //  }
    this.getAllMainMenu();
     
  }
  public getAllMainMenu(){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token};
    let url:string = "AdminLoginAction/get_all_main_menu";
    this.networkArea.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        this.response = response;
        for( let i = 0; i < this.response.length; i++ ){
          this.response[i].btnBg = "white";
          this.response[i].sampleColor = "rgb(168, 168, 168)"; 
        }
      }, error=>{

      }
    );
  }
  public selectMainMenu( a:any){
    this.isMenu1Selected = false;
     this.selectedText = this.response[a].m_menu_name;
    // this.response[a].sampleColor = "red";
     for( let i = 0; i < this.response.length; i++ ){
      if( a == i){
        this.response[i].btnBg = "#f44336";
        this.response[a].sampleColor = "white";
      }else{
        this.response[i].btnBg= "white";
        this.response[i].sampleColor = "rgb(168, 168, 168)";
      }
    }
    let selectedMainMenu:any = this.response[a];
    if( selectedMainMenu.is_independant == 1 ){
      this.subMenu = [];
      this.isMenu1Selected = true;
      return;
    }
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"main_menu_id":this.response[a].main_menu_id, "token":token, "user_id":adminId} ;
     
    this.networkArea.postData( body, "AdminLoginAction/get_menu_1").subscribe(
      data=>{
        console.log(JSON.stringify(data));
        let response:any = data;
        if( response.status == 1 ){
          this.subMenu = response.data.menu;
          for( let i = 0; i < this.subMenu.length; i++) {
            this.subMenu[i].txtClr = "rgb(168, 168, 168)";
            this.subMenu[i].btnBg = "white";
          }
        }else{
          alert("No data");
        }
      }, error=>{

      }
    );
  }
  public selectMenu1( select:any ){
    this.isMenu1Selected = true;
     this.selectedMainMenu = this.subMenu[select].relation_id;
    for( let i = 0; i < this.subMenu.length; i++ ){
      if( select == i ){
        this.subMenu[i].txtClr = "white";
        this.subMenu[i].btnBg = "#008CBA";
      }else{
        this.subMenu[i].txtClr = "rgb(168, 168, 168)";
        this.subMenu[i].btnBg = "white";
      }
    }
    let body:any = {"relation_id":this.selectedMainMenu} ;
    this.networkArea.postData( body, "AdminLoginAction/get_qtn_header_indpdnt")
    .subscribe( 
      data=>{
        let response:any = data; 
        this.addedQtnHeaders = response; 
      }, error=>{}
    );
  }
  public submitHeader(){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"main_menu_1_id":this.selectedMainMenu, "token":token, "user_id":adminId,
    "qtn_header":this.qtnHeader} ;
    this.networkArea.postData( body, "AdminLoginAction/add_mltple_qtn_header")
    .subscribe(
      data=>{ 
        let response:any = data; 
        if( response.status >0 ){
          //console.log("submitheader"+response);
          this.addedQtnHeaders = response.data;
          this.qtnHeader = "";  
          
          // this.dataShare.question_relation_id = response.status;
          // this.router.navigate(['home/addmlplechceqtncompnt',{relationId:'ha', question:'asdfasd'} ]);
          this.goToAddMultipleChceQtn(response.status,this.qtnHeader, false );

        }else{
          alert("Can't insert");
        }
          
      }, error=>{
        console.log(error);
        alert("Server error");
      }
    );

  }
  public goToAddMultipleChceQtn( id:any, questionHeader:String , isUpdate:boolean ){
          this.dataShare.isUpdate = isUpdate;
          this.dataShare.questionHeaderDetails = {
            "headerId":id, "headerName":questionHeader 
          };
          this.router.navigate(['home/addmlplechceqtncompnt',{"headerId":id, "headerName":questionHeader} ]);
  }
}
