import { Component, OnInit } from '@angular/core';
import { NetworkingareaService } from '../networkingarea.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-main-sub-menu',
  templateUrl: './manage-main-sub-menu.component.html',
  styleUrls: ['./manage-main-sub-menu.component.css']
})
export class ManageMainSubMenuComponent implements OnInit {
  public mainMenuList:any[] = [];
  public menu1List:any[] = [];
  public sample:string;
  public mainMenu:string;
  public isIndependant:any;
  constructor( public networking:NetworkingareaService, public spinner:NgxSpinnerService  ) { }

  ngOnInit() {
    this.getMainMenu();
  }
  public getMainMenu(){
    this.spinner.show();
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token};
    let url:string = "AdminLoginAction/get_all_main_menu";
    this.networking.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        for( let i = 0; i < response.length; i++ ){
          let item:any = {"menu_name":response[i].menu_name, "main_menu_id":response[i].main_menu_id};
          this.mainMenuList.push(item);
          this.spinner.hide();
        }
        console.log(JSON.stringify(this.mainMenuList))
      }, error=>{
        this.spinner.hide();
      }
    );
  }
  public addMainMenu(){ 
    if ( this.mainMenu == null ){
      alert("Please enter value");
      return;
    }
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let isIndependant:number;
    if ( this.isIndependant == true ){
      isIndependant = 1;
    }else{
      isIndependant = 0;
    }
    let body:any = {"admin_id":adminId, "token":token, "is_independant":isIndependant, "main_menu":this.mainMenu};
    let url:string = "AdminLoginAction/add_main_menu";
    this.spinner.show();
    this.networking.postData( body, url ).subscribe(
      data=>{
        this.spinner.hide();
        let response:any = data;
        this.mainMenuList = [];
        for( let i = 0; i < response.length; i++ ){
          let item:any = {"menu_name":response[i].menu_name, "main_menu_id":response[i].main_menu_id};
          this.mainMenuList.push(item)
        }
      }, error=>{ 
        this.spinner.hide();
        alert("an error occured")}
    );
  }
  public disableMenu( id:number ){
    
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'admin_id':adminId, 'token':token, 'menu_id':id};
    let url = "AdminLoginAction/deactivate_main_menu";
    this.networking.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        this.mainMenuList = [];
        for( let i = 0; i < response.length; i++ ){
          let item:any = {"menu_name":response[i].menu_name, "main_menu_id":response[i].main_menu_id};
          this.mainMenuList.push(item)
        }
      }, error=>{
        alert("an error occured")
      }
    );
  }
  public getMenu1( id:number){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'user_id':adminId, 'token':token, 'main_menu_id':id};
    let url = "AdminLoginAction/get_menu_1";
    this.networking.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        this.menu1List = response.data.menu;
      }, error=>{}
    );
  }
}
 