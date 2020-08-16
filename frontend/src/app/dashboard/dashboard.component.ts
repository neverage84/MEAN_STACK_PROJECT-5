import { XmlService, Diagnostics_S } from './../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  diagnosticInfo: Diagnostics_S

  constructor(service: XmlService) { 

    this.diagnosticInfo = service.diagnosticInfo;
    console.log(this.diagnosticInfo);
  }

  ngOnInit(): void {
  }

}
