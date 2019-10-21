import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
import { Router } from '@angular/router'; //**Added Line */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { } //**Modified Line */

  ngOnInit() {
  }
  //**Added Section - Start */
  navigateToSignature() {
    this.router.navigate(['/signature'])
  }
  //**Added Section - End */

}
