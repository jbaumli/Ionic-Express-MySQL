import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
import { Router } from '@angular/router'; //**Added Line */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { } //**Modified Line */

  ngOnInit() {
  }
  //**Added Section - Start */
  logout() {
    this.authService.logout();
  }

  navigateToDisclaimer() {
    this.router.navigate(['/disclaimer'])
  }
  //**Added Section - End */
}
