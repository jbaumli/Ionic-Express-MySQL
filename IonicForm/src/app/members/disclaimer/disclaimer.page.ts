//**Added */
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
//
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  navigateToSignature() {
    this.router.navigate(['/signature'])
  }

}
