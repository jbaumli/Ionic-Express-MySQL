import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
import { Router } from  "@angular/router"; //**Added Line */

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
showError: boolean; //**Added Line */
errorMessage: string; //**Added Line */

  constructor(private authService: AuthenticationService, private  router:  Router) { } //**Modified Line */

  ngOnInit() {
  }
  //**Added Section - Start */
  login(form){
    this.authService.login(form.value).subscribe(result => {
        this.router.navigateByUrl(`dashboard`);
      },
      error => {    
        this.showError = true;
        this.errorMessage = error.error.message
      });
  }
  //**Added Section - End */
}
