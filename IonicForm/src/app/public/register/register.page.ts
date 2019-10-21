import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router"; //**Added Line */
import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private  authService:  AuthenticationService, private  router:  Router) { } //**Modified Line */

  ngOnInit() {
  }
  //**Added Section - Start*/
  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }
  //**Added Section - End */
}
