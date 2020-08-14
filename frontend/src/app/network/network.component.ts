import { Component, OnInit } from '@angular/core';
import { XmlService } from '../xml.service';
import { Http } from '@angular/http';


@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
network: string[];

  // constructor( private service: XmlService) { }
constructor (http: Http){
   http.get('http://localhost:3000/xml')
   .subscribe(response => {
    
    //  this.network = response.json();
    //  this.xml = response.json().Status.Network[0].Ethernet[0];
  console.log(Object.values(response.json().Status.Network[0].Ethernet[0]).toString().split(","));
  this.network = Object.values(response.json().Status.Network[0].Ethernet[0]).toString().split(",");
 
   })
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
