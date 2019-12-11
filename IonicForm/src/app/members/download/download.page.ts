import { AuthenticationService } from './../../services/authentication.service'; //**Added Line */
import { Router } from '@angular/router'; //**Added Line */
import { environment, ROUTES_URL} from './../../../environments/environment'; //**Added Line */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx'; //**Added Line */
import { AlertController, ToastController } from '@ionic/angular'; //**Added Line */

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  ROUTES_URL;
  records : any = [];
  constructor(public router: Router, public httpClient: HttpClient, private file: File, public toastController: ToastController) { } //**Modified Line */

  ngOnInit() {
  }
  //**Added Section - Start */
  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Records Deleted!',
      message: 'Thank You!',
      position: 'middle',
      buttons: [{ text: 'Close', role: 'ok', handler: () => {this.records = ''; this.router.navigateByUrl('/dashboard')}}]
    });
    await toast.present();
  }
  
  downloadRecords() {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/download`).subscribe(data=>{
      this.records = [data];
      var fileDir = '/Android/data/io.ionic.starter'; 
      var filename = "result.json";
      this.file.writeFile(fileDir, filename, this.records, {replace: true}) ;
    })
  }

  deleteRecords() {
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/delete`).subscribe(data=>{
      this.presentToast();
    })
  }
  //**Added Section - End */
}
