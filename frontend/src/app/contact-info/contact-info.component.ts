import { Contact_S, XmlService } from './../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  contactInfo: Contact_S;

  constructor(service: XmlService) { 
    this.contactInfo = service.contactInfo;
  }

  ngOnInit(): void {
  }

}
