import { Component, OnInit } from '@angular/core';
//**Added */
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from  "@angular/router";
//

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
//**Added */
showError: boolean;
errorMessage: string;
//
  constructor(private authService: AuthenticationService, private  router:  Router) { }

  ngOnInit() {
    //**Added */
    //this.authService.login();
    //

  }
  login(form){
    this.authService.login(form.value).subscribe(result => {
        this.router.navigateByUrl(`dashboard`);
      },
      error => {    
        this.showError = true;
        this.errorMessage = error.error.message
      });
  }
}
