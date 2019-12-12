import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //**Added Line */
import { Router } from  "@angular/router"; //**Added Line */
import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showError: boolean; //**Added Line */
  errorMessage: string; //**Added Line */

  constructor(private  authService:  AuthenticationService, private  router:  Router, private formBuilder: FormBuilder) { } //**Modified Line */
  public onRegisterForm: FormGroup; //**Added Line */
  ngOnInit() {
    //**Added Section - Start*/
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
    //**Added Section - End */
  }
  //**Added Section - Start*/
  register(onRegisterForm) {
    this.authService.register(onRegisterForm.value).subscribe((res) => {
      onRegisterForm.reset();
      this.router.navigateByUrl('dashboard');
    },
    error => {    
      this.showError = true;
      this.errorMessage = error.error.message
    });
  }
  goToLogin() {
    this.router.navigateByUrl('login');
  }
  //**Added Section - End */
}
