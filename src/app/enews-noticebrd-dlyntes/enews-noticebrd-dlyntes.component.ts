import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AppConstant } from '../app-constant'
import { NetworkingareaService } from '../networkingarea.service';
import{ ModalEditItemComponent } from '../modal-edit-item/modal-edit-item.component'
import {MatDialog,MatDialogRef} from '@angular/material/dialog';  
export interface DialogData {
  heading: string;
  inputData: string;
  secondfield:boolean;
  detail:string;
  webUrl:string;
}
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
  public addSubMenuButton:String = "Add new sub menu";
  public isMainMenuEditing:boolean = false;
  public isSubMenuEditing:boolean = false;
  public selectedMainMenuId:number;
  public selectedMainMenu:String;
  public selectedSubMenuId:number;
  public selectedSubMenu:string;
  public edtMainMenuId:number;
  public newSubMenu:string; 
  public mainMenuList:Array<MainMenu> = [];
  public subMenuList:Array<SubMenu> = [];
  public detailList:Array<Details> = [];
   
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
  public editSubmenu( id:number, subMenu:string ){
    if( this.isMainMenuEditing == true )
      return;
      this.isMainMenuEditing  = true;
    const dialogRef = this.dialog.open( ModalEditItemComponent,{ width:'250px', 
    data:{ heading:"Edit sub menu",  inputData:subMenu }
    });
    dialogRef.afterClosed().subscribe( result=>{
      this.isMainMenuEditing = false;
      let temp:any = result;
      if( temp.isCancel == false ){
        this.startEditSubmenu( id, temp.inputData, true );
      }
     
    }); 
  }
  public startEditSubmenu( id:number, subMenu:string , isEdit:boolean ){ 
    let disEnab:number;
    if( isEdit ){
      disEnab = 0;
    }else{
      disEnab = 1;
    }
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "main_menu_id": this.selectedMainMenuId,
                "sub_menu_id":id, "is_dis_en":disEnab, "submenu":subMenu };
    let url:string = "EmploymentNewsDailyNotes/editEmploymentDailySubMenu";

    this.network.postData( body, url ).subscribe( data=>{
      this.updateSubMenu( data );
    }, error=>{ alert("an error occured")})
  }
  public editMainMenu( id:number , menuName:String ){
    if( this.isMainMenuEditing == true )
      return;
    this.isMainMenuEditing = true;
    const dialogRef = this.dialog.open( ModalEditItemComponent,{ width:'250px', 
    data:{ heading:"Edit main menu",  inputData:menuName}
    });
    dialogRef.afterClosed().subscribe( result=>{
      this.isMainMenuEditing = false;
      let temp:any = result;
      if( temp.isCancel == false ){
        this.startEditMainMenu( id ,temp.inputData );
      }
     
    });
    this.edtMainMenuId= id;
  }
  public startEditMainMenu( mainMenuId:number, newMenu:String){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "menu_id": mainMenuId,"type":this.mainMenuType,
                     "is_dis_en":0, new_menu:newMenu };
    let url:string = "EmploymentNewsDailyNotes/editEmploymentDailyMainMenu";
    this.network.postData( body, url ).subscribe(
      data=>{
        this.updateMainMenu( data );
      }, error=>{

      }
    ); 
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
  public loadSubMenu( mainMenuId:number, menu:string ){
    this.selectedMainMenu = menu;
    this.selectedMainMenuId = mainMenuId;
    this.selectedSubMenuId = null;
    this.detailList = [];
    this.subMenuList = [];
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "main_menu_id":mainMenuId};
    
    
    let url:string = "EmploymentNewsDailyNotes/getAllEmploymentDailySubMenu"; 
    this.network.postData ( body, url ).subscribe(
      data=>{
        this.updateSubMenu( data );
      }, error=>{
        alert("Network error");
      }
    );
  }
  public addSubmenu(){
    if( !this.newSubMenu ){
      alert("Field cannot be empty");
      return;
    }
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token, "main_menu_id":this.selectedMainMenuId,"submenu":this.newSubMenu};
    let url:string = "EmploymentNewsDailyNotes/addEmploymentDailySubMenu";
    this.network.postData( body, url ).subscribe(
      data=>{
        this.updateSubMenu( data );
      }, error=>{
        console.log( error );
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
    this.subMenuList = [];
    this.detailList = [];
    if( response.status.status > 0 ){
      let mainMenu:any = response.main_menu;
      this.mainMenuList = [];
      for( let i = 0; i < mainMenu.length; i++ ){
        let item:any = mainMenu[i];
        let enabDisbBtn:String; 
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
  public updateSubMenu( response:any ){
 
        if( response.status.status > 0 ){
          let subMenu:any = response.sub_menu;
          this.subMenuList = [];
          for( let i = 0; i < subMenu.length; i++ ){
            let item:any = subMenu[i];
            let enabDisbBtn:string;
            if( item.is_active == 1 ){
              enabDisbBtn = "Disable";
            }else if( item.is_active == -1 ){
              enabDisbBtn = "Enable";
            }
            this.subMenuList.push( new SubMenu( item.id, item.main_menu_id, item.sub_menu_name, item.is_active, enabDisbBtn ) );
          } 
        }else{
          this.subMenuList = [];
          alert( response.status.message);
        }
  }
  public enaDisMain(id:number, mainMenu:String ){
    this.edtMainMenuId = id;
    this.updateDeleteMainMenu( false );
  }
  public updateDeleteMainMenu( isUpdate:boolean ){
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
      "menu_id":this.edtMainMenuId,"is_dis_en": isDisableEnable, "type":this.mainMenuType};
    this.network.postData( body, url ).subscribe(
      data=>{
        let response:any = data; 
        this.updateMainMenu( response );
        this.edtMainMenuId= null;
        this.isMainMenuEditing = false;
      }, error=>{
        console.log( error )
      }
    );
  }

  public actionDetails( subMenuId:number,subMenu:string,is_dis_en_edit:number, header:string,
     detail:string, detailsId:number, webUrl:string ){
    this.selectedSubMenu = subMenu;
    this.selectedSubMenuId = subMenuId;
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let url:string = "EmploymentNewsDailyNotes/addEmploymentDailyDetails"; 
    let body:any = {"token":token, "admin_id":adminId, "sub_menu_id":subMenuId, "details_id":detailsId,
                  "header":header,"details":detail,"is_dis_en_edit":is_dis_en_edit, web_url:webUrl};
    console.log(body);
    this.network.postData( body, url ).subscribe( data=>{
      console.log(data)
      this.updateDetailsView( data );
      }, error=>{console.log(error)} );
  }
  public enabDisabDetails( detailsId:number){
    this.actionDetails( this.selectedSubMenuId, this.selectedSubMenu,1,"","", detailsId,"");
  }
  public AddDetails( isEdit:boolean, detailsId:number){
    if( !this.selectedSubMenu ){
      alert("Please choose submenu")
      return;
    }
    if( this.isMainMenuEditing == true )
      return;
    this.isMainMenuEditing = true;
    let header:string;
    let secondary:string;
    let webUrl:string;
    for( let i = 0; i < this.detailList.length; i++ ){
      let details:Details = this.detailList[i];
      if( details.id == detailsId ){
        header = details.header;
        secondary = details.details;
        webUrl = details.webUrl;
        break;
      }
    }
    const dialogRef = this.dialog.open( ModalEditItemComponent,{ width:'100%', height:'100%' ,
    data:{ heading:"Edit main menu",  inputData:header, detail:secondary,secondfield:true, webUrl:webUrl }
    });
    dialogRef.afterClosed().subscribe( result=>{
      this.isMainMenuEditing = false;
      let temp:any = result;
      if( temp.isCancel == false ){
        let isEnab:number;
        if( isEdit ){
          isEnab = 2;
        }else{
          isEnab = 0;
        }
        this.actionDetails(this.selectedSubMenuId,this.selectedSubMenu, isEnab,temp.inputData,temp.secondField,detailsId, temp.webUrl)
      }
      
    }); 
  } 
  public updateDetailsView( response:any ){
    this.detailList = [];
    if( response.status.status > 0 ){
      let detailsList:any = response.details;
      if( detailsList.length > 0 ){
        for( let i = 0; i < detailsList.length; i ++ ){
          let tempItem:any = detailsList[i];
          let enabDisab:string;
          if( tempItem.is_active == 1){
            enabDisab = "Disable";
          }else{
            enabDisab = "Enable";
          } 
          let details:Details = new Details( tempItem.id, tempItem.submenu_id, tempItem.header, tempItem.details,
              tempItem.is_active, enabDisab, tempItem.web_url);
          this.detailList.push( details );
        }
      }
    }else{
      alert( response.status.message );
    }
  }
   
}

export class MainMenu{
  constructor(public menuName:String, public isActive:number, public id:number, public enabDisbBtn:String ){}

}
export class SubMenu{
  constructor( public id:number, public mainMenuId:number, public subMenu:String, public isActive:number,public enabDisbBtn:String ){}
}
export class Details{
  constructor( public id:number, public subMenuId:number, public header:string, public details:string, public isActive:number,
    public enabDisbBtn:String, public webUrl:string ){}
}
export class TempObject{
  public ab:String;
}
