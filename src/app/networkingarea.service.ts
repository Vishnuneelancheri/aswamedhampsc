import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { from } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable( )
export class NetworkingareaService {
  private baseUrl:string;
  constructor(private httpClient: HttpClient ) { 
    this.baseUrl = "https://aswamedhampsc.in/aswamedhampsc/api/aswamedham/index.php/";
    //  this.baseUrl = "http://192.168.1.6:80/aswamedham/index.php/";
  }
  public postData( body:any, url:string ){
    let currentUrl:any = this.baseUrl + url;  
    console.log( currentUrl);
    return this.httpClient.post(currentUrl, body, httpOptions);        
  }
}
