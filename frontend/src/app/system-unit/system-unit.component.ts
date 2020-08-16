import { System_S, XmlService } from './../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'system-unit',
  templateUrl: './system-unit.component.html',
  styleUrls: ['./system-unit.component.css']
})
export class SystemUnitComponent implements OnInit {

  systemInfo: System_S;

  constructor(private service: XmlService) { 
    this.systemInfo = service.systemInfo;
    console.log(this.systemInfo);
  }

  ngOnInit(): void {
  }

}
