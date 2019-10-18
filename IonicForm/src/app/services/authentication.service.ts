import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
//Extra
import { Observable } from 'rxjs';
import { AuthResponse } from  '../public/auth-response';
import { HttpClient } from  '@angular/common/http';
import { User } from  '../public/user';
import { tap } from  'rxjs/operators';
//const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform, private httpClient: HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    //this.storage.get(TOKEN_KEY).then(res => {
    this.storage.get("ACCESS_TOKEN").then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authenticationState.next(true);
        }
      })
    );
  }
 
  //login() {
    //return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      //this.authenticationState.next(true);
    //});
  //}

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authenticationState.next(true);
        }
      })
    )
  }
 
  logout() {
    //return this.storage.remove(TOKEN_KEY).then(() => {
    return this.storage.remove("ACCESS_TOKEN").then(() => {      
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}