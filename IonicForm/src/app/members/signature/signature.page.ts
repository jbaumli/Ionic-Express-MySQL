import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  public signatureForm: FormGroup;
  public submitAttempt: boolean = false;

  constructor(public router: Router, public alertController: AlertController, public formBuilder: FormBuilder, public httpClient: HttpClient) { }

  ngOnInit() {
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
  }

  validation_messages = {
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

  sendPostRequest() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let postData = this.signatureForm.value;
    this.httpClient.post("http://localhost:3000/signature", postData,{responseType: 'text'})
      .subscribe(data => {
        //console.log(data);
        this.presentAlert();
      }, error => {
        //console.log(error);
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

}