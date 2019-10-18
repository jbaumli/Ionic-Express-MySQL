import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//**Added */
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' }
];
//

@NgModule({
  declarations: [],
  //imports: [
  //  CommonModule
  //]
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
