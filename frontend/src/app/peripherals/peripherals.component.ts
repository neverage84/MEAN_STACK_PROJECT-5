import { Component, OnInit } from '@angular/core';
import { XmlService, Peripherals_S } from '../xml.service';

@Component({
  selector: 'peripherals',
  templateUrl: './peripherals.component.html',
  styleUrls: ['./peripherals.component.css']
})
export class PeripheralsComponent implements OnInit {

  peripheralsInfo : Peripherals_S;
  constructor(service: XmlService) { 

    this.peripheralsInfo = service.peripheralsInfo;
    console.log(this.peripheralsInfo);
  }

  ngOnInit(): void {
  }

}

function tableHeaders(item){
  console.log(item);
}
