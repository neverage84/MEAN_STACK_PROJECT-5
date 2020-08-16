import { Calls_S, XmlService } from './../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  callsInfo: Calls_S
  constructor(service: XmlService) {
    this.callsInfo = service.callsInfo;
    
   }

  ngOnInit(): void {
  }

}
