import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {interval} from 'rxjs';

export interface Network_S{
  ethernet : string[];
  iPv4: string[];
  iPv6: string[];
}

export interface Peripherals_S{
  connectedDevice : any[];
  connectedDeviceHeader : any[];
  connectedCameraHeader: any[];
}

@Injectable({
  providedIn: 'root'
})

export class XmlService {

  private url = 'http://localhost:3000/xml';

  public networkInfo: Network_S = {ethernet : [], iPv4: [], iPv6:[] };
  public peripheralsInfo: Peripherals_S = {connectedDevice: [], connectedDeviceHeader: [], connectedCameraHeader: []};
 

  //function to take response, replace $ with "Item" as that seems to be the relevant info. (maxOccurance 'n' I'm assuming is not what the user needs?)
  replace$(headerArr){
    headerArr[0] = "Item";
    return headerArr;
  };
//function to get values from each object in array with item value being the first one
  getValuesFromObjArray(ObjArr){

    let newTest = ObjArr.map((v) => {
      let test = Object.values(v);
      test[0] = Object.values(test[0])[0];
      return test;
    })
    // let test = Object.values(ObjArr[0]);
    // test[0] = Object.values(test[0])[0];
    // return test;
    return newTest;
   }
  

  //function that runs the http request for xml file
  getXml() {
    this.http.get(this.url)
    .subscribe(response => {


     //Network items: Ethenet, IPv4, and IPv6 
    this.networkInfo.ethernet = Object.values(response.json().Status.Network[0].Ethernet[0]);
    this.networkInfo.iPv4 = Object.values(response.json().Status.Network[0].IPv4[0]);
    this.networkInfo.iPv6 = Object.values(response.json().Status.Network[0].IPv6[0]);
    
    //Peripheral Items: ConnectedDevice & Cameras
    this.peripheralsInfo.connectedDevice = this.getValuesFromObjArray(Object.values(response.json().Status.Peripherals[0].ConnectedDevice));
    this.peripheralsInfo.connectedDeviceHeader = this.replace$(Object.keys(response.json().Status.Peripherals[0].ConnectedDevice[0]));
    this.peripheralsInfo.connectedCameraHeader = this.replace$(Object.keys(response.json().Status.Cameras[0].Camera[0]));
    });
    
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
  }

  
    // return this.http.get(this.url);
    // this.test.ethernet = ["x", "x"];


  

  



