import { Router } from '@angular/router'; //**Added Line */
import { AuthenticationService } from './services/authentication.service'; //**Added Line */
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  //**Added Section - Start */
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'License Details',
      url: '/license',
      icon: 'lock'
    },
  ];
  //**Added Section - End */

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, //** Modified Line - (add ending comma) */
    private authenticationService: AuthenticationService, //**Added Line */
    private router: Router //**Added Line*/
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //**Added Section - Start */
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });
      //**Added Section - End */
    });
  }
  //**Added Section - Start */
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  //**Added Section - End */
}
