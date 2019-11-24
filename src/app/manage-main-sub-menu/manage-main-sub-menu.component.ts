import { Component, OnInit } from '@angular/core';
import { NetworkingareaService } from '../networkingarea.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu1 } from '../menu_1/menu-1';
import { Router,NavigationExtras } from '@angular/router'; 
import {MatDialog,MatDialogRef} from '@angular/material/dialog';  
import{ ModalEditItemComponent } from '../modal-edit-item/modal-edit-item.component';
  import { from } from 'rxjs';

  export interface DialogData {
    heading: string;
    inputData: string;
    secondfield:boolean;
    detail:string;
    webUrl:string;
  }
@Component({
  selector: 'app-manage-main-sub-menu',
  templateUrl: './manage-main-sub-menu.component.html',
  styleUrls: ['./manage-main-sub-menu.component.css']
})
export class ManageMainSubMenuComponent implements OnInit {
  public mainMenuList:any[] = [];
  public menu1List:any[] = [];
  public allMenu1List:Menu1[] = [];
  public sample:string;
  public mainMenu:string;
  public isIndependant:any;
  public menu_1:any[];
  public newMenu1:string;
  public selectedMenu:string;
  public selectedMenuId:number;
  constructor( public networking:NetworkingareaService, public spinner:NgxSpinnerService,
    public router:Router,  public dialog:MatDialog  ) { }

  ngOnInit() {
    this.getMainMenu();
  }
  public getMainMenu(){
    this.spinner.show();
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let body:any = {"admin_id":adminId, "token":token,"show_disabled":1};
    let url:string = "AdminLoginAction/get_all_main_menu";
    this.networking.postData( body, url ).subscribe(
      data=>{
        this.spinner.hide();
        let response:any = data;
        let mainmenu:any = response.main_menu;
        for( let i = 0; i < mainmenu.length; i++ ){
          let item:any = {"menu_name":mainmenu[i].menu_name, "main_menu_id":mainmenu[i].main_menu_id,
            "m_menu_isactive":mainmenu[i].m_menu_isactive  
          };
          if(mainmenu[i].m_menu_isactive == 1){
            item.button_name = "Disable";
          }else{
            item.button_name = "Enable";
          }
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
    if ( this.mainMenu == null  ){
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
        let mainmenu:any = response.main_menu;
        this.mainMenuList = [];
        for( let i = 0; i < mainmenu.length; i++ ){
          let item:any = {"menu_name":mainmenu[i].menu_name, "main_menu_id":mainmenu[i].main_menu_id,
          "m_menu_isactive":mainmenu[i].m_menu_isactive  };
          if(mainmenu[i].m_menu_isactive == 1){
            item.button_name = "Disable";
          }else{
            item.button_name = "Enable";
          }
          this.mainMenuList.push(item)
        }
      }, error=>{ 
        this.spinner.hide();
        alert("an error occured")}
    );
  }
  public disableEnableMenu( id:number, menuIsActive:number ){
    console.log( menuIsActive )
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'admin_id':adminId, 'token':token, 'menu_id':id};

    if( menuIsActive == 0 ){
      
      body.is_enable = 0;
    } 
    this.spinner.show();
    let url = "AdminLoginAction/enable_disable_main_menu";
    let isDisable:boolean;
    this.networking.postData( body, url ).subscribe(
      data=>{
        this.spinner.hide();
        let response:any = data;
        let mainmenu:any = response.main_menu;
        console.log( JSON.stringify( response ) )
        this.mainMenuList = [];
        for( let i = 0; i < mainmenu.length; i++ ){
          let item:any = {"menu_name":mainmenu[i].menu_name, "main_menu_id":mainmenu[i].main_menu_id,
          "m_menu_isactive":mainmenu[i].m_menu_isactive  };
          if(mainmenu[i].m_menu_isactive == 1){
            item.button_name = "Disable";
          }else{
            item.button_name = "Enable";
          }
          this.mainMenuList.push(item)
        }
      }, error=>{
        this.spinner.hide();
        alert("an error occured")
      }
    );
  }
  public disableEnableMenu1(){

  }
  public getMenu1( id:number, mainMenuName:string){
    this.selectedMenu = null;
    this.selectedMenuId = id;
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'admin_id':adminId, 'token':token, 'main_menu':id};
    console.log( JSON.stringify(body));
    let url = "AdminLoginAction/get_all_menu_1"; 
    this.spinner.show();
    this.networking.postData( body, url ).subscribe(
      data=>{
        this.spinner.hide();
        let response:any = data; 
        this.menu1List = response;
        this.selectedMenu = mainMenuName;
        this.showMenu1List(response);
        this.spinner.hide();
      }, error=>{
        this.spinner.hide();
      }
    );
  }
  public getAllMenu1(){
    if ( this.selectedMenuId == null || this.selectedMenuId < 0 ){
      alert("Please select main menu");
      return;
    }
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'admin_id':adminId, 'token':token,'main_menu':this.selectedMenuId};
    let url = "AdminLoginAction/get_all_menu_1";
    this.spinner.show();
    this.networking.postData( body, url ).subscribe(
      data=>{
        let response:any = data;
        console.log( JSON.stringify( response ))
        this.showMenu1List( response )
        
        this.spinner.hide();
         
      },
      error=>{ 
        console.log( JSON.stringify(error ));
        this.spinner.hide();
      }
    );
  }
  public addMenu1(){
    let newMenu1:string = this.newMenu1;
    if( newMenu1 == null ){
      alert("Please enter value");
      return;
    }
    if ( this.selectedMenuId == null || this.selectedMenuId < 0 ){
      alert("Please select main menu");
      return;
    }
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'admin_id':adminId, 'token':token,'menu_1_name':newMenu1, 'main_menu_id':this.selectedMenuId};
    let url:string = "AdminLoginAction/add_menu_1";
    this.spinner.show();
    this.networking.postData(body, url).subscribe(
      data=>{
        this.spinner.hide();
        let response:any = data;
        this.newMenu1 = "";
        this.showMenu1List( response.data )
      },error=>{
        this.spinner.hide();
      }
    );
  }
  public showMenu1List( response:any){
    console.log("showmenulist"+ JSON.stringify( response ))
    this.allMenu1List = []
        for( let i = 0; i < response.length; i++ ){
          let menu1Details:any = response[i];
          let buttonName:string; 
          if( menu1Details.menu_1_isactive == "1" ){
            buttonName = "Disable";
          }else{
            buttonName = "Enable"
          }
          let menu1:Menu1 = new Menu1( menu1Details.menu_1_id, menu1Details.menu_1_name,
             menu1Details.menu_1_isactive, buttonName);
          this.allMenu1List.push(menu1);
        } 
  }
  public enabledisableMenu( i:number){
    let menu1:Menu1 = this.allMenu1List[i];
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token"); 
    let body:any ={'admin_id':adminId, 'token':token, "menu_1_id": menu1.menu_1_id,'main_menu_id':this.selectedMenuId};
    if( menu1.menu_1_isactive != 1){
      body.is_enable = "3";
    }
  
    let url:string = "AdminLoginAction/enable_disable_menu1";
    this.spinner.show();
    this.networking.postData( body, url ).subscribe(
      data=>{
        this.spinner.hide();
        let response:any = data;
        this.newMenu1 = "";
        this.showMenu1List( response.data )
      }, error=>{
        this.spinner.hide();}
    );

  }
  public goToMockTest(  ){
    this.router.navigate(['home/mock_test_panel']);
  }
  public editSubMenu( menu1Id:number ){
    const dialogRef = this.dialog.open( ModalEditItemComponent,{ width:'50%', height:'50%' ,
      data:{ heading:"Edit main menu",  inputData:"Enter new value here", detail:null,secondfield:false, webUrl:null }
    });
    dialogRef.afterClosed().subscribe( result=>{
      let temp:any = result;
      if( temp.isCancel == true ) {
        return;
      } 
      
      this.spinner.show();
      let adminId:String = window.localStorage.getItem("admin_id");
      let token:String = window.localStorage.getItem("token"); 
      let body:any = {'token':token, 'admin_id':adminId,
       'main_menu_id': this.selectedMenuId,'menu_1_id':menu1Id, 'menu': temp.inputData };
      let url:string = "CustomerRegistration/edit_menu_1";
      console.log(body)
      this.networking.postData( body, url ).subscribe( result=>{
        let res:any = result;
        this.showMenu1List( res.menu );
        console.log(res)
        this.spinner.hide();
      }, error=>{
        console.log(error.error);
        this.spinner.hide();
      });
    });
  }
  public editMainMenu(menuId:number){
    const dialogRef = this.dialog.open( ModalEditItemComponent,{ width:'50%', height:'50%' ,
      data:{ heading:"Edit main menu",  inputData:"Enter new value here", detail:null,secondfield:false, webUrl:null }
    });
    dialogRef.afterClosed().subscribe( result=>{ 
      let temp:any = result;
      if( temp.isCancel == true ){
        return;
      }
      let adminId:String = window.localStorage.getItem("admin_id");
      let token:String = window.localStorage.getItem("token"); 
      let body:any = {'token':token, 'admin_id':adminId, 'main_menu_id': menuId, 'menu': temp.inputData };
      let url:string = "CustomerRegistration/edit_main_menu";
      this.spinner.show();
      this.networking.postData(body, url).subscribe(
        data=>{
          console.log( data );
          let res:any = data;
          this.spinner.hide();
          let mainmenu = res.menu;
          this.mainMenuList = Array();
          for( let i = 0; i < mainmenu.length; i++ ){
            let item:any = {"menu_name":mainmenu[i].m_menu_name, "main_menu_id":mainmenu[i].main_menu_id,
              "m_menu_isactive":mainmenu[i].m_menu_isactive  
            };
            if(mainmenu[i].m_menu_isactive == 1){
              item.button_name = "Disable";
            }else{
              item.button_name = "Enable";
            }
            this.mainMenuList.push(item);
            this.spinner.hide();
          }
          
        }, error=>{
          console.log(error)
          
          this.spinner.hide();
        }
      );
    });
  }
}
 