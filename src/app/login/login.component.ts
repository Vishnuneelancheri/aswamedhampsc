import { Component, OnInit } from '@angular/core';
import { NetworkingareaService } from '../networkingarea.service';
import { from } from 'rxjs';
import { Router,NavigationExtras } from '@angular/router'; 
import { DataShareService } from '../data-share.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
    loading = false;
    returnUrl: string;
    
  constructor(private networkingArea :NetworkingareaService, public router:Router,
    public dataShare:DataShareService, public ngxSpinnerService:NgxSpinnerService ) { }

  ngOnInit() { 
    
  }
  public networkcall(){ 
    let body:any = {"user_name":this.model.username, "password":this.model.password};
    this.ngxSpinnerService.show();
    
    this.networkingArea.postData( body,"AdminLoginAction/login").subscribe( data=>{ 
      //console.log(data); 
      //this.ngxSpinnerService.hide();
      this.ngxSpinnerService.hide();
      let response:any = data;
      if( response.status == 1){
        let content = response.data.menu;
        console.log(JSON.stringify(response.data ));
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("admin_id", response.data.admin_id);
        window.localStorage.setItem("menu", JSON.stringify(response.data.menu));
        
        this.dataShare.storage = {
          "firstname": "Nic",
          "lastname": "Raboy",
          "address": {
              "city": "San Francisco",
              "state": "California"
          }
      };
        this.router.navigateByUrl('home');
        
        //this.router.navigateByUrl('home');
      }else{
        
        //console.log(response);
        alert(response.data.message);
      }

    },
      error=>{
        this.ngxSpinnerService.hide();
        alert(error.error)})
  }
  
}
