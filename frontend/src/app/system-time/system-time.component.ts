import { Time_S, XmlService } from './../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'system-time',
  templateUrl: './system-time.component.html',
  styleUrls: ['./system-time.component.css']
})
export class SystemTimeComponent implements OnInit {

timeInfo : Time_S;

  constructor(service: XmlService) { 
    this.timeInfo = service.timeInfo;
    console.log(this.timeInfo);
  }

  ngOnInit(): void {
  }

}
