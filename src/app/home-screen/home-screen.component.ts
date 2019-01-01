import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DataShareService } from '../data-share.service'
import { Router,NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  public firstname:string;
  public lastname:string;
  constructor( public route:ActivatedRoute, public dataShare:DataShareService ,
    public router:Router ) { 
     
    this.route.queryParams.subscribe(params => {
      this.firstname = params["firstname"];
      this.lastname = params["lastname"];
    });
    
   }

  ngOnInit() {
    console.log( JSON.stringify(this.dataShare.storage) );
  }
  public manageMenu(){
    this.router.navigate(['home/manage_main_sub_menu']);
  }

}
