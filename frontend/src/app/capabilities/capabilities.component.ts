import { Component, OnInit } from '@angular/core';
import { XmlService, Capabililites_S } from '../xml.service';

@Component({
  selector: 'capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.css']
})
export class CapabilitiesComponent implements OnInit {

  capabilitiesInfo : Capabililites_S;
  constructor(service: XmlService) { 

    this.capabilitiesInfo = service.capabilitiesInfo;
    console.log(this.capabilitiesInfo);
  }

  ngOnInit(): void {
  }

}
