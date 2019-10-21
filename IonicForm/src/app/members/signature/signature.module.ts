import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //**Modified Line (Added ', ReactiveFormsModule') ) */
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignaturePage } from './signature.page';

const routes: Routes = [
  {
    path: '',
    component: SignaturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), ReactiveFormsModule //**Modified Line (Added ', ReactiveFormsModule') ) */
  ],
  declarations: [SignaturePage]
})
export class SignaturePageModule {}
