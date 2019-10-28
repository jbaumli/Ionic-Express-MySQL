import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-license',
  templateUrl: './license.page.html',
  styleUrls: ['./license.page.scss'],
})
export class LicensePage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  sites : any = [];
  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/license`).subscribe(data=>{
      this.sites = [data];
    })
  }
}
