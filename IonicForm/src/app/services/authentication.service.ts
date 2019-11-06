import { Injectable } from '@angular/core';
//**Added Section - Start */
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthResponse } from  '../public/auth-response';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { User } from  '../public/user';
import { tap } from  'rxjs/operators';
import { environment} from './../../environments/environment'; //**Added Line */
//**Added Section - End */
 
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
//**Added Section - Start */  
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  authenticationState = new BehaviorSubject(false);
  token:any;
//**Added Section - End */ 
  constructor(private storage: Storage, private plt: Platform, private httpClient: HttpClient, ) { //**Modified Function */ 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  //**Added Section - Start */ 
  checkToken() {
    this.storage.get("ACCESS_TOKEN").then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  register(user: User): Observable<AuthResponse> {
    const headers = new HttpHeaders()
    .set('site_id', environment.site_id)
    .set('audience', user.email)
    //.set('site_key', environment.site_key)
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user, { headers: headers }).pipe(
      tap(async (res:  AuthResponse ) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user[0].access_token);
          await this.storage.set("EXPIRES_IN", res.user[0].expires_in);
          await this.storage.set("audience", user.email);
          this.authenticationState.next(true);
        }
      })
    );
  }
 
  login(user: User): Observable<AuthResponse> {
    const headers = new HttpHeaders()
    .set('site_id', environment.site_id)
    .set('audience', user.email)
    //.set('site_key', environment.site_key)
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/login`, user, { headers: headers }).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user[0].access_token);
          await this.storage.set("EXPIRES_IN", res.user[0].expires_in);
          await this.storage.set("audience", user.email);
          this.authenticationState.next(true);
        }
      })
    )
  }

  logout() {
    return this.storage.remove("ACCESS_TOKEN").then(() => {      
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
  //**Added Section - End */ 
}