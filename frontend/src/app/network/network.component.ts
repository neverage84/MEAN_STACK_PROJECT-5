import { Component, OnInit } from '@angular/core';
import { XmlService, Network_S } from '../xml.service';



@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  networkInfo : Network_S;
  

  constructor( private service: XmlService) { 

    this.networkInfo = service.networkInfo;
// constructor (http: Http){
  // this.service.getXml()
  //  .subscribe(response => {
   
   
   
  // console.log(Object.values(response.json().Status.Network[0].Ethernet[0]));
  // this.network = Object.values(response.json().Status.Network[0].Ethernet[0]);
 
  //  })
  //  console.log(this.network);
}




  ngOnInit() {
      // this.service.getNetwork()
      // .subscribe(response => {
      //   this.network = response.json();
      // })

      // console.log(this.network);
    }
  

}
