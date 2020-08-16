import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {interval} from 'rxjs';

//Network variables binding 
export interface Network_S{
  ethernet : string[];
  iPv4: string[];
  iPv6: string[];
}

//Peripherals variables binding
export interface Peripherals_S{
  connectedDevice : any[];
  connectedDeviceHeader : any[];
  connectedCameraHeader: any[];
  connectedCamera: any[];
}

//Capabilities Binding
export interface Capabililites_S{
  conference : any[];
  conferenceHeader : any[];
}

//Calls Binding
export interface Calls_S{
  calls : any[];
  callsHeaderOne : any[];
  callsHeaderTwo : any[];
}

@Injectable({
  providedIn: 'root'
})

export class XmlService {

  private url = 'http://localhost:3000/xml';

  public networkInfo: Network_S = {ethernet : [], iPv4: [], iPv6:[] };
  public peripheralsInfo: Peripherals_S = {connectedDevice: [], connectedDeviceHeader: [], connectedCameraHeader: [], connectedCamera: []};
  public capabilitiesInfo: Capabililites_S = {conference:[], conferenceHeader: []};
  public callsInfo: Calls_S = {calls:[], callsHeaderOne:[], callsHeaderTwo:[]};
  //function to take response, replace $ with "Item" as that seems to be the relevant info. (maxOccurance 'n' I'm assuming is not what the user needs?)
  replace$(headerArr){
    headerArr[0] = "Item";
    return headerArr;
  };

//function to get values from each object in array with item value being the first one
  getValuesFromObjArray(ObjArr){

    let formattedArr = ObjArr.map((v) => {
      let idealArr = Object.values(v);
      idealArr[0] = Object.values(idealArr[0])[0];
      return idealArr;
    })
 
    return formattedArr
   }

   //repeat of above function but for Camera obj Arr as it's different
   getValuesFromObjArrayCamera(ObjArr){

    let formattedArr = ObjArr.map((v) => {
      let idealArr = Object.values(v);
      idealArr[0] = Object.values(idealArr[0])[0];
      idealArr[1] = Object.values((idealArr[1])[0])[0];
      return idealArr;
    })
 //only cameras with value of "True" are returned
    return formattedArr.filter((arr) => {
      return arr[2] == "True";
    });
   }
  

  //function that runs the http request for xml file
  getXml() {
    this.http.get(this.url)
    .subscribe(response => {


     //Network items: Ethernet, IPv4, and IPv6 
    this.networkInfo.ethernet = Object.values(response.json().Status.Network[0].Ethernet[0]);
    this.networkInfo.iPv4 = Object.values(response.json().Status.Network[0].IPv4[0]);
    this.networkInfo.iPv6 = Object.values(response.json().Status.Network[0].IPv6[0]);
    
    //Peripheral Items: ConnectedDevice & Cameras
    this.peripheralsInfo.connectedDevice = this.getValuesFromObjArray(Object.values(response.json().Status.Peripherals[0].ConnectedDevice));
    this.peripheralsInfo.connectedDeviceHeader = this.replace$(Object.keys(response.json().Status.Peripherals[0].ConnectedDevice[0]));
    this.peripheralsInfo.connectedCameraHeader = this.replace$(Object.keys(response.json().Status.Cameras[0].Camera[0]));
    this.peripheralsInfo.connectedCamera = this.getValuesFromObjArrayCamera(Object.values(response.json().Status.Cameras[0].Camera));

    //Capabilities item: Conference
    this.capabilitiesInfo.conferenceHeader = Object.keys(response.json().Status.Capabilities[0].Conference[0]);
    this.capabilitiesInfo.conference = Object.values(response.json().Status.Capabilities[0].Conference[0]);

    //Calls item: Details
    this.callsInfo.callsHeaderOne = this.replace$(Object.keys(response.json().Status.Call[0])).splice(0,9);
    this.callsInfo.callsHeaderTwo = this.replace$(Object.keys(response.json().Status.Call[0])).splice(9,16);
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


  

  



