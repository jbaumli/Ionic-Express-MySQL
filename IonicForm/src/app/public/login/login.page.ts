import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
import { Router } from  "@angular/router"; //**Added Line */
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //**Added Line */

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
showError: boolean; //**Added Line */
errorMessage: string; //**Added Line */
public onLoginForm: FormGroup; //**Added Line */

  constructor(private authService: AuthenticationService, private  router:  Router, private formBuilder: FormBuilder) { } //**Modified Line */

  ngOnInit() {
    //**Added Section - Start */
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
    //**Added Section - End */
  }
  //**Added Section - Start */
  login(onLoginForm){
    this.authService.login(onLoginForm.value).subscribe(result => {
        this.router.navigateByUrl('dashboard');
      },
      error => {    
        this.showError = true;
        this.errorMessage = error.error.message
      });
  }  
  goToRegister() {
    this.router.navigateByUrl('register');
  }
  //**Added Section - End */
}