import { Component, OnInit } from '@angular/core';
//**Added */
import { Router } from  "@angular/router";
import { AuthenticationService } from './../../services/authentication.service';
//
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //** Added constructor items */
  constructor(private  authService:  AuthenticationService, private  router:  Router) { }

  ngOnInit() {
  }
  //**Added */
  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }
  //
}
