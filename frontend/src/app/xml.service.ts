import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {interval} from 'rxjs';

export interface Network_S{
  ethernet : any[];
}

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  private url = 'http://localhost:3000/xml';

  public info: Network_S = {ethernet : ["", ""]};
 
  getXml() {
    this.http.get(this.url)
    .subscribe(response => {


     //Network items: Ethenet, IPv4, and IPv6 
    this.info.ethernet = Object.values(response.json().Status.Network[0].Ethernet[0]);


    })
    ;
  }
  
  constructor(private http: Http) { 
// this.service.getXml()
  //  .subscribe(response => {
   
  // console.log(Object.values(response.json().Status.Network[0].Ethernet[0]));
  // this.network = Object.values(response.json().Status.Network[0].Ethernet[0]);
 
 this.getXml();

  interval(60000).subscribe(x => { // will execute every 30 seconds
    this.getXml();
   
  });
  }

  
    // return this.http.get(this.url);
    // this.test.ethernet = ["x", "x"];


  

  
}


