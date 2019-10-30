import { Component, OnInit } from '@angular/core';
//**Added Section - Start */
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
//**Added Section - End */

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  public signatureForm: FormGroup; //**Added Line */
  public submitAttempt: boolean = false; //**Added Line */
  
  constructor(public router: Router, public alertController: AlertController, public formBuilder: FormBuilder, public httpClient: HttpClient, public toastController: ToastController, private storage: Storage) { } //**Modified Line */

  ngOnInit() {
    //**Added Section - Start */
    this.signatureForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      birthday: [''],
      cellphone: [''],
      terms: new FormControl('false', Validators.requiredTrue)
    });
    //**Added Section - End */
  }
  //**Added Section - Start */
  validations = {
    'firstname': [{ type: 'required', message: 'First Name is Required' }],
    'lastname': [{ type: 'required', message: 'Last Name is Required' }],
    'email': [{ type: 'required', message: 'Email is Required' }, { type: 'pattern', message: 'Email is not Valid' }],
    'terms': [{ type: 'required', message: 'You must agree to the terms!' }]
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Information Submitted',
      message: 'Thank You!',
      buttons: [{ text: 'Close', role: 'ok', handler: () => {this.signatureForm.reset(); this.router.navigateByUrl('/dashboard')}}]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Information Submitted',
      message: 'Thank You!',
      position: 'middle',
      buttons: [{ text: 'Close', role: 'ok', handler: () => {this.signatureForm.reset(); this.router.navigateByUrl('/dashboard')}}]
    });
    await toast.present();
  }

  sendPostRequest() {
    let token = this.storage.get('ACCESS_TOKEN');
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    
    let postData = this.signatureForm.value;
    this.httpClient.post("http://localhost:3000/signature", postData,{responseType: 'text'})
      .subscribe(data => {
        //this.presentAlert();
        this.presentToast();
      }, error => {
    });
  }

    onSubmit(value: any): void { 
      this.submitAttempt = true;
      // Stop if the form validation has failed
      if (this.signatureForm.invalid) {
          return;
      }
      this.sendPostRequest();
    }

  get frm() { return this.signatureForm.controls; }
  //**Added Section - End */
}