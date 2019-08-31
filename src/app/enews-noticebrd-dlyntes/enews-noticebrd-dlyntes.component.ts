import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AppConstant } from '../app-constant'
import { from } from 'rxjs';
@Component({
  selector: 'app-enews-noticebrd-dlyntes',
  templateUrl: './enews-noticebrd-dlyntes.component.html',
  styleUrls: ['./enews-noticebrd-dlyntes.component.css']
})
export class EnewsNoticebrdDlyntesComponent implements OnInit {
  moduleType: String;
  heading:String;
  tempObj:TempObject
  submenuList:Array<Object> = [
    { name:"20-10-18"},
    { name:"20-10-19"}
  ]
  constructor( public router:ActivatedRoute ) { }

  ngOnInit() {
    let sub:any = this.router.params.subscribe( params=>{
       this.moduleType = params['modulteType'];
       this.initView();
    });
  }
  public initView(){
    if( this.moduleType == AppConstant.EMPLOYMENT_NEWS ){
      this.heading = "തൊഴിൽ അവസരങ്ങൾ";
    }
  }

}
export class TempObject{
  public ab:String;
}
