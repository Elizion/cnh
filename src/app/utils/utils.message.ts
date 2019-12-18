import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

export class UtilsMessage {

 constructor(
  private alertCtrl: AlertController,
  private router: Router
 ) {}

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
  routerNavigateVacations() {
   return this.router.navigateByUrl('/vacations');
  }

 async alertLogin() {
  const alert = await this.alertCtrl.create({
   header: 'Error',
   subHeader: 'Auth',
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
       subHeader: 'Profile',
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
       subHeader: 'Token',
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
       subHeader: 'Noticias',
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
       subHeader: 'Noticias',
       message: 'Error al cargar los datos.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertImpressPersonal() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Noticias',
       message: 'Error al imprimir archivos.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertPayroll() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Recibos',
       message: 'Error al cargar los datos.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertFormPayroll() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Recibos',
       message: 'Error al enviar la solicitud.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertImpressPayroll() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Recibos',
       message: 'Error al imprimir archivo.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertVacations() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Vacaciones',
       message: 'Error al cargar los datos.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertFormVacations() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Vacaciones',
       message: 'Error al enviar la solicitud.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertImpressVacations() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Vacaciones',
       message: 'Error al imprimir archivo.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertSaveVacations() {
    const alert = await this.alertCtrl.create({
       header: 'Error',
       subHeader: 'Vacaciones',
       message: 'Error al enviar la solicitud.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
 async alertListVoidVacations() {
    const alert = await this.alertCtrl.create({
       header: 'Sin datos',
       subHeader: 'Vacaciones',
       message: 'Lista de dias vacias.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }

 async alertExtensionNotAvaible() {
    const alert = await this.alertCtrl.create({
       header: 'Descarga',
       subHeader: 'Avisos',
       message: 'Archivo no disponible.'
    });
    await alert.present();
    setTimeout (() => {
       alert.dismiss();
    }, 3000);
 }
   

   
   async alertMensajeFechas(mensajes: string[]) {
      //con boton de okay 
      let i = 0;
      for (i; i < mensajes.length; i++ ) {
         console.log(i + '---' + mensajes[i]);
      }
      const alert = await this.alertCtrl.create({
         header: 'Agregar',
         subHeader: 'Vacaciones',
         message: mensajes.toString()
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }

   async alertGuardarFechas(mensajes: string[]) {
      //con boton de okay 
      let i = 0;
      for (i; i < mensajes.length; i++ ) {
         console.log(i + '---' + mensajes[i]);
      }
      const alert = await this.alertCtrl.create({
         header: 'Guardar',
         subHeader: 'Vacaciones',
         message: mensajes.toString()
      });
      await alert.present();
      setTimeout (() => {
         alert.dismiss();
      }, 3000);
   }

}

