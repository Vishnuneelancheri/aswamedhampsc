import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AppConstant } from '../app-constant'
import { NetworkingareaService } from '../networkingarea.service';
import{ ModalEditItemComponent } from '../modal-edit-item/modal-edit-item.component'
import {MatDialog} from '@angular/material/dialog'; 
@Component({
  selector: 'app-enews-noticebrd-dlyntes',
  templateUrl: './enews-noticebrd-dlyntes.component.html',
  styleUrls: ['./enews-noticebrd-dlyntes.component.css']
})
export class EnewsNoticebrdDlyntesComponent implements OnInit {
  public moduleType: String;
  public heading:String;
  public mainMenuType:number;
  public newMainMenu:String;
  public tempObj:TempObject;
  public addMainMenuButton:String = "Add new main menu";
  public addSubMenuButton:String = "Add new sub menu";
  public isMainMenuEditing:boolean = false;
  public isSubMenuEditing:boolean = false;
  public edtMainMenuId:number;
  public submenuList:Array<Object> = [
    { name:"20-10-18"},
    { name:"20-10-19"}
  ];
  public mainMenuList:Array<MainMenu> = [];
  public subMenuList:Array<SubMenu> = [];
   
  constructor( public router:ActivatedRoute, public network:NetworkingareaService, public dialog:MatDialog ) { }

  ngOnInit() {
    let sub:any = this.router.params.subscribe( params=>{
       this.moduleType = params['modulteType'];
       this.initView();
    });
  }
  public initView(){
    this.mainMenuList =[];
    if( this.moduleType == AppConstant.EMPLOYMENT_NEWS ){
      this.heading = "തൊഴിൽ അവസരങ്ങൾ";
      this.mainMenuType = 1;
    }else if( this.moduleType == AppConstant.DAILY_NOTE ){
      this.heading = "ഡെയിലി  നോട്ട്സ്";
      this.mainMenuType = 2;
    }else{
      this.heading = "നോട്ടീസ് ബോർഡ്";
      this.mainMenuType = 3;
    }
    this.loadMainMenu();
  }
  public editMainMenu( id:number , menuName:String ){
    const dialogRef = this.dialog.open( ModalEditItemComponent,{ width:'250px'});
    dialogRef.afterClosed().subscribe( result=>{});
    this.edtMainMenuId= id;
    this.isMainMenuEditing = true;
    this.addMainMenuButton = "Edit '" + menuName +"'";
    console.log( id );
  }
  public loadMainMenu(){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "type":this.mainMenuType};

    let url:string = "EmploymentNewsDailyNotes/getAllEmploymentDailyMainMenu"; 
    this.network.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        this.updateMainMenu( response );
      },error=>{
        alert("Network error");
      }
    );
  }
  public loadSubMenu( mainMenuId:number ){
    
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "main_menu_id":mainMenuId};
    this.subMenuList = [];
    
    let url:string = "EmploymentNewsDailyNotes/getAllEmploymentDailySubMenu"; 
    this.network.postData ( body, url ).subscribe(
      data=>{
        let response:any = data;
        if( response.status.status > 0 ){
          let subMenu:any = response.sub_menu;
          for( let i = 0; i < subMenu.length; i++ ){
            let item:any = subMenu[i];
            this.subMenuList.push( new SubMenu( item.id, item.main_menu_id, item.sub_menu_name, item.is_active ) );
          }
          console.log( this.subMenuList );
        }else{
          alert( response.status.message);
        }
      }, error=>{
        alert("Network error");
      }
    );
  }
  public addNewMainMenu(){
    if( this.isMainMenuEditing == true ){
      this.updateDeleteMainMenu( true );
      return;
    }
    if( this.newMainMenu === "" ){
      alert( "Field can't be empty");
    }else{
      let adminId:String = window.localStorage.getItem("admin_id");
      let token:String = window.localStorage.getItem("token");
      let body:any = {"admin_id":adminId, "token":token, "type":this.mainMenuType, "main_menu": this.newMainMenu};
      let url:string = "EmploymentNewsDailyNotes/addEmploymentDailyMainMenu"; 
      this.network.postData( body, url ).subscribe(
        data=>{
          let response:any = data;
          this.updateMainMenu(response);
        },error=>{
          alert("Network error");
        }
      );
    }
  }
  public updateMainMenu( response:any ){
    if( response.status.status > 0 ){
      let mainMenu:any = response.main_menu;
      this.mainMenuList = [];
      for( let i = 0; i < mainMenu.length; i++ ){
        let item:any = mainMenu[i];
        let enabDisbBtn:String;
        console.log("disen", item.is_active);
        if( item.is_active == 1 ){
          enabDisbBtn = "Disable";
        }else if( item.is_active == -1 ){
          enabDisbBtn = "Enable";
        }
        this.mainMenuList.push( new MainMenu( item.menu_name, item.is_active, item.id, enabDisbBtn ) );
      } 
      
  }else
    alert( response.status.message);
  }
  public enaDisMain(id:number, mainMenu:String ){
    this.edtMainMenuId = id;
    this.updateDeleteMainMenu( false );
  }
  public updateDeleteMainMenu( isUpdate:boolean ){
    console.log("updatemainmenu");
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let isDisableEnable:number;
    let newMenu:String;
    if( isUpdate ){
      isDisableEnable = 0;
      newMenu = this.newMainMenu;
      if( newMenu === ""){
        alert("Field cannot be empty");
        return;
      }
    }else{
      newMenu = "";
      isDisableEnable = 1;
      
    } 
    let url:string = "EmploymentNewsDailyNotes/editEmploymentDailyMainMenu"; 
    let body:any = {"token":token, "admin_id":adminId,"new_menu":newMenu, 
      "menu_id":this.edtMainMenuId,"is_dis_en": isDisableEnable};
    console.log( body );
    this.network.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        console.log( response );
        this.updateMainMenu( response );
        this.edtMainMenuId= null;
        this.isMainMenuEditing = false;
      }, error=>{
        console.log( error )
      }
    );
  }
}
export class MainMenu{
  constructor(public menuName:String, public isActive:number, public id:number, public enabDisbBtn:String ){}

}
export class SubMenu{
  constructor( public id:number, public mainMenuId:number, public subMenu:String, public isActive:number ){}
}
export class Details{
  constructor( public id:number, public subMenuId:number, public header:String, public details:String, public isActive:number ){}
}
export class TempObject{
  public ab:String;
}
