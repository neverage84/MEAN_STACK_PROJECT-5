import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {interval} from 'rxjs';

export interface Network_S{
  ethernet : string[];
  iPv4: string[];
  iPv6: string[];
}

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  private url = 'http://localhost:3000/xml';

  public networkInfo: Network_S = {ethernet : [], iPv4: [], iPv6:[] };
 
  getXml() {
    this.http.get(this.url)
    .subscribe(response => {


     //Network items: Ethenet, IPv4, and IPv6 
    this.networkInfo.ethernet = Object.values(response.json().Status.Network[0].Ethernet[0]);
    this.networkInfo.iPv4 = Object.values(response.json().Status.Network[0].IPv4[0]);
    this.networkInfo.iPv6 = Object.values(response.json().Status.Network[0].IPv6[0]);


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


