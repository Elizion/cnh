import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
export class GlobalService {
   constructor(
      private platform: Platform,
      private file: File,
      private fileOpener: FileOpener,
      private alertCtrl: AlertController,
      private router: Router
   ) {}
   isLoading = false;
   isLogin   = true;
   token() {
      const token   = window.localStorage.getItem('token');
      const parseToken = JSON.parse(token);
      return parseToken;
   }
   personId() {
      const id   = window.localStorage.getItem('personId');
      const parseId = JSON.parse(id);
      return parseId;
   }
   b64toBlob(b64Data: string, nameFile: string, contentType: string, sliceSize: number): void {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
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
      const fileName = nameFile;
      const filePath = (this.platform.is('android')) ? this.file.externalRootDirectory : this.file.cacheDirectory;
      this.file.writeFile(filePath, fileName, blob, { replace: true }).then((fileEntry) => {
         console.log('File created!');
         this.fileOpener.open(fileEntry.toURL(), contentType)
         .then(() => console.log('File is opened'))
         .catch(err => console.error('Error openening file: ' + err));
      })
      .catch((err) => {
         console.error('Error creating file: ' + err);
         throw err;
      });
   }
   handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
         console.error('Error: ' + error.error.message);
      } else {
         console.error('Code: ' + error.status);
         console.error('Body: ' + JSON.stringify(error.error));
      }
      return throwError('Something bad happened; please try again later.');
   }
   headers(token: string, contentType: string) {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type':  contentType,
            Authorization: token
         })
      };
      return httpOptions;
   }
   routerNavigateAuth() {
      return this.router.navigateByUrl('/auth');
   }
   routerNavigateProfile() {
      return this.router.navigateByUrl('/profile');
   }
   routerNavigateNotices() {
      return this.router.navigateByUrl('/notices');
   }
   routerNavigatePayroll() {
      return this.router.navigateByUrl('/payroll');
   }
   async alertLogin() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Autenticación',
         message: 'Usuario y/o contraseñas invalidos, intente de nuevo porfavor.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertProfile() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Carga del profile',
         message: 'No se ha cargado el profile correctamente, intente de nuevo porfavor.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertToken() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Generación de token',
         message: 'No se ha generadodo el token correctamente, intente de nuevo porfavor.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertGeneral() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Carga noticias generales',
         message: 'Error al cargar los datos.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertPersonal() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Carga noticias generales',
         message: 'Error al cargar los datos.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertPayroll() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Carga noticias generales',
         message: 'Error al cargar los datos.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertAddDate() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Carga noticias generales',
         message: 'Error al enviar la solicitud.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }
   async alertImpress() {
      const alert = await this.alertCtrl.create({
         header: 'Error',
         subHeader: 'Carga noticias generales',
         message: 'Error al imprimir archivo.'
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }

  /*
  README: Open from url file content:
  open() {
    const request: DownloadRequest = {
      uri: 'https://devdactic.com/html/5-simple-hacks-LBT.pdf',
      title: 'vacaciones',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'app-debug.apk'
      }
    };
    this.downloader.download(request)
    .then((location: string) => console.log('File downloaded at:' + location))
    .catch((error: any) => console.error(error));
  }
  */
}
