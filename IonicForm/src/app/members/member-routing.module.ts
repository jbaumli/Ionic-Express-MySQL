import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common'; //**Removed Line */
//**Added Section - Start*/
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },  { path: 'license', loadChildren: './license/license.module#LicensePageModule' }

];
//**Added Section - End */

@NgModule({
  declarations: [],
  //imports: [ //**Removed Line */
  //  CommonModule //**Removed Line */
  //] //**Removed Line */
  imports: [RouterModule.forChild(routes)], //**Added Line */
  exports: [RouterModule] //**Added Line */
})
export class MemberRoutingModule { }
