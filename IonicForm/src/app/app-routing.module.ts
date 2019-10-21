import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; /** Added Line */ 

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' }, /** Removed Line */
  { path: '', redirectTo: 'login', pathMatch: 'full' },  /** Added Line */ 
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'disclaimer', loadChildren: './members/disclaimer/disclaimer.module#DisclaimerPageModule' },
  { path: 'signature', loadChildren: './members/signature/signature.module#SignaturePageModule' },
  { path: 'members', canActivate: [AuthGuard], loadChildren: './members/member-routing.module#MemberRoutingModule'}, /** Added Line */ 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
