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
  callsOne : any[];
  callsTwo: any[];
  callsHeaderOne : any[];
  callsHeaderTwo : any[];
}

//Contacts Binding
export interface Contact_S{
  name : string[];
  email: string[];
  number : string[];
}

//SystemTime Binding
export interface Time_S{
  time : string;
}

//Diagnostics Time Binding
export interface Diagnostics_S{
  diaTime : string;
  diagnostics: any[];
}

//System Binding
export interface System_S{
  
  serialNumber: string[];
  temperature: string[];
  productId: string[];
  productPlatform: string[];
  productType: string[];
  fan: any[];
  fanHeader: any[];
  software: any[];
  softwareHeader: any[];
  state: any[];
  stateHeader: any[];
  
}


@Injectable({
  providedIn: 'root'
})

export class XmlService {

  private url = 'http://localhost:3000/xml';

  public networkInfo: Network_S = {ethernet : [], iPv4: [], iPv6:[] };
  public peripheralsInfo: Peripherals_S = {connectedDevice: [], connectedDeviceHeader: [], connectedCameraHeader: [], connectedCamera: []};
  public capabilitiesInfo: Capabililites_S = {conference:[], conferenceHeader: []};
  public callsInfo: Calls_S = {callsOne:[], callsTwo:[], callsHeaderOne:[], callsHeaderTwo:[]};
  public contactInfo: Contact_S = {name: [], email: [], number: []};
  public timeInfo: Time_S = {time: ""};
  public diagnosticInfo: Diagnostics_S = {diaTime: "", diagnostics: []};
  public systemInfo: System_S = { serialNumber: [], temperature: [], productId: [], productPlatform: [], productType: [], fan: [], fanHeader:[], software:[], softwareHeader:[], state:[], stateHeader:[]};
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


   //Camera obj Arr as it's different
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

    //Call obj Arr as it's different
    getValuesFromObjArrayCall(ObjArr){

      
        let idealArr = Object.values(ObjArr);
        idealArr[0] = Object.values(idealArr[0])[0];
        idealArr[8] = Object.values((idealArr[8])[0])[0];
       
        return idealArr[15] == "Connected" ? idealArr : ["NotConnected"];
    
  
     }
  
     //Diagnostics Function
     getDiagnostics(arr){
       
      let idealArr = []
      for (let i = 0; i < arr.length; i++){
        idealArr.push(Object.values(arr[i][2][0])[0]);
        idealArr.push(Object.values(arr[i][1][0])[0]);
      }

      return idealArr;

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
    this.callsInfo.callsHeaderTwo = this.replace$(Object.keys(response.json().Status.Call[0])).splice(9);
    this.callsInfo.callsOne = this.getValuesFromObjArrayCall(Object.values(response.json().Status.Call[0])).splice(0,9);
    this.callsInfo.callsTwo = this.getValuesFromObjArrayCall(Object.values(response.json().Status.Call[0])).splice(9);
  
    //Contact item: Details
   this.contactInfo.email = response.json().Status.UserInterface[0].ContactInfo[0].ContactMethod[0].Number;
   this.contactInfo.number = response.json().Status.UserInterface[0].ContactInfo[0].ContactMethod[1].Number;
   this.contactInfo.name = response.json().Status.UserInterface[0].ContactInfo[0].Name;
  
   //Contact item: Details
  let dateFormatted = new Date(response.json().Status.Time[0].SystemTime.toString())
  this.timeInfo.time = dateFormatted.toString();

  //System item: Details
  let diagDateFormatted = new Date(response.json().Status.SystemUnit[0].Diagnostics[0].LastRun[0]._.toString())
  this.diagnosticInfo.diaTime = diagDateFormatted.toString();
  this.diagnosticInfo.diagnostics = this.getDiagnostics(this.getValuesFromObjArray(response.json().Status.SystemUnit[0].Diagnostics[0].Message));
  
   //System item: Details
   this.systemInfo.serialNumber = response.json().Status.SystemUnit[0].Hardware[0].Module[0].SerialNumber;
   this.systemInfo.productId = response.json().Status.SystemUnit[0].ProductId;
   this.systemInfo.productPlatform = response.json().Status.SystemUnit[0].ProductPlatform;
   this.systemInfo.productType = response.json().Status.SystemUnit[0].ProductType;
   this.systemInfo.temperature = response.json().Status.SystemUnit[0].Hardware[0].Temperature;

   this.systemInfo.fanHeader = this.replace$(Object.keys(response.json().Status.SystemUnit[0].Hardware[0].Monitoring[0].Fan[0]));
   this.systemInfo.fan = this.getValuesFromObjArray(Object.values(response.json().Status.SystemUnit[0].Hardware[0].Monitoring[0].Fan));

   this.systemInfo.stateHeader = Object.keys(response.json().Status.SystemUnit[0].State[0]);
   this.systemInfo.state = Object.values(response.json().Status.SystemUnit[0].State[0]);
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


  

  



