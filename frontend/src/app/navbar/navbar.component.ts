import { Component, OnInit } from '@angular/core';
import { Time_S, XmlService } from './../xml.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  timeInfo : Time_S;

  constructor(service: XmlService) { 
    this.timeInfo = service.timeInfo;
   
  }
  ngOnInit(): void {
  }

}
