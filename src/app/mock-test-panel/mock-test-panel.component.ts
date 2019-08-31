import { Component, OnInit } from '@angular/core';
import { NetworkingareaService } from '../networkingarea.service';
import { HeaderModel } from './header-model'


@Component({
  selector: 'app-mock-test-panel',
  templateUrl: './mock-test-panel.component.html',
  styleUrls: ['./mock-test-panel.component.css']
})
export class MockTestPanelComponent implements OnInit {
  public mock_header: any = {};
  public headerList: HeaderModel[] = [];
  constructor( public networkingArea :NetworkingareaService ) { }

  ngOnInit() {
    this.getAllMockHeader();
  }
  
  public getAllMockHeader(){
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let url = "AdminLoginAction/get_all_mock_test_header";
    
    let body:any = {"token":token, "admin_id":adminId };
    this.networkingArea.postData( body, url ).subscribe(
      data=>{
        this.showHeader( data)
      }, error=>{}
    );
  }
  public addMockHeader(){
    
    let adminId:String = window.localStorage.getItem("admin_id");
    let token:String = window.localStorage.getItem("token");
    let url = "AdminLoginAction/insert_mock_qtn_header";
    
    let body:any = {"token":token, "admin_id":adminId, "header":this.mock_header.header_name};
    this.networkingArea.postData( body, url ).subscribe(
      data=>{
       let response:any = data; 
       this.showHeader( response );
      }, error=>{

      }
    );
  }
  public showHeader( response:any ){
    if ( response.status > 0 ){
      let mockArray:any = response.data;
      this.headerList = [];
       for( let i = 0; i < mockArray.length; i++ ){
         let headerModel:HeaderModel = new  HeaderModel(mockArray[i].mock_id,mockArray[i].mock_header,mockArray[i].mock_is_active);
         this.headerList.push( headerModel)
       }
       console.log( JSON.stringify(this.headerList)  );
    }else{
      alert( response.message );
    }
  }
}
/* 
    [
      {"menu_name":"sample","main_menu_id":"14","m_menu_isactive":"1","button_name":"Disable"},
      {"menu_name":"dd","main_menu_id":"15","m_menu_isactive":"1","button_name":"Disable"},
      {"menu_name":"dd","main_menu_id":"16","m_menu_isactive":"1","button_name":"Disable"}
    ]
*/