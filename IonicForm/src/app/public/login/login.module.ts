import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //**Modified Line (Added ', ReactiveFormsModule') ) */
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), ReactiveFormsModule //**Modified Line (Added ', ReactiveFormsModule') ) */
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
