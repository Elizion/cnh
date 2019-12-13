import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { retry, catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Constants as CONST } from '../config/config.const';

@Injectable({
 providedIn: 'root'
})
export class GlobalService {

   constructor(
      private httpClient: HttpClient,
      private platform: Platform,
      private file: File,
      private fileOpener: FileOpener,
      private loadingCtrl: LoadingController
   ) {}

   request   = window.localStorage.getItem('user');
   response  = JSON.parse(this.request);
   isLoading = false;
   isLogin   = true;

   handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
         console.error('Error: ' + error.error.message);
      } else {
         console.error('Body: ' + JSON.stringify(error.error));
      }
      return throwError('Something bad happened; please try again later.');
   }

   headers() {
      const httpOptions = {
         headers: new HttpHeaders({
         'Content-Type':  CONST.X_WWW_FORM_URLENCODED,
         })
      };
      return httpOptions;
   }

   getIdPerson() {
      const personId  = this.response.data.personId;
      return personId;
   }

   apiFake() {
      return this.httpClient.get('https://jsonplaceholder.typicode.com/posts').pipe(
         retry(CONST.ONE),
         catchError(this.handleError)
      );
   }

   b64toBlob(b64Data: string, contentType: string, sliceSize: number): void {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      this.isLoading = true;
      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Procesando descarga...' })
      .then(loadingEl => {
         loadingEl.present();
         for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
               byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
         }
         const blob = new Blob(byteArrays, { type: contentType });
         const fileName = 'vacaciones.pdf';
         const filePath = (this.platform.is('android')) ? this.file.externalRootDirectory : this.file.cacheDirectory;
         this.file.writeFile(filePath, fileName, blob, { replace: true }).then((fileEntry) => {
            console.log('File created!');
            this.fileOpener.open(fileEntry.toURL(), contentType)
            .then(() => console.log('File is opened'))
            .catch(err => console.error('Error openening file: ' + err));
            this.isLoading = false;
            loadingEl.dismiss();
         })
         .catch((err) => {
            console.error('Error creating file: ' + err);
            throw err;
         });
      });
  }

}
