import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  private url = 'http://localhost:3000/xml';

  constructor(private http: Http) { }

  getNetwork() {
    return this.http.get(this.url);
  }
}
