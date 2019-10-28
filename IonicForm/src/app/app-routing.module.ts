import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; /** Added Line */ 
import { NonauthGuard } from './guards/nonauth.guard'; /** Added Line */ 

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' }, /** Removed Line */
  { path: '', redirectTo: 'login', pathMatch: 'full' },  /** Added Line */ 
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)}, /** Removed Line */
  { path: 'login', canActivate: [NonauthGuard], loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', canActivate: [NonauthGuard], loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' }, /** Modified Line */  
  { path: 'disclaimer', canActivate: [AuthGuard], loadChildren: './members/disclaimer/disclaimer.module#DisclaimerPageModule' }, /** Modified Line */  
  { path: 'signature', canActivate: [AuthGuard], loadChildren: './members/signature/signature.module#SignaturePageModule' }, /** Modified Line */  
  { path: 'license', canActivate: [AuthGuard], loadChildren: './members/license/license.module#LicensePageModule' }, /** Modified Line */  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
