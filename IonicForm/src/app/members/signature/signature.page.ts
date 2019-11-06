import { Component, OnInit } from '@angular/core';
//**Added Section - Start */
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment} from './../../../environments/environment'; //**Added Line */
//**Added Section - End */

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {
  showError: boolean; //**Added Line */
  errorMessage: string; //**Added Line */

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
    var token: string;
    this.storage.get('ACCESS_TOKEN').then((val) => {



      this.storage.get("audience").then(res => {
        token = val;
        const headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization',  'Bearer ' + token)
        .set('responseType', 'text')
        .set('site_id', environment.site_id)        
        .set('audience', res)
        //.set('site_key', environment.site_key)
        let postData = this.signatureForm.value;
        this.httpClient.post("http://localhost:3000/signature", postData, { headers: headers })
        .subscribe(data => {
          this.presentToast();
        }, error => {
          this.showError = true;
          this.errorMessage = error.error.message
        });

      })



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