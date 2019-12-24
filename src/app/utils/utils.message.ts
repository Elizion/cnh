import {
    AlertController
} from '@ionic/angular';
import {
    Router
} from '@angular/router';
import {
    VacationsService
} from '../services/vacations.service';
import { LoadingController } from '@ionic/angular';

export class UtilsMessage {

    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private router: Router,
        private vacationsService: VacationsService
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
    routerNavigateVacationsUpdate() {
        return this.router.navigateByUrl('/vacations/update');
    }
    routerNavigateVacationsCancel() {
        return this.router.navigateByUrl('/vacations/cancel');
    }

    async alertLogin() {
        const alert = await this.alertCtrl.create({
            header: 'Error',
            subHeader: 'Auth',
            message: 'Usuario y/o contraseñas invalidos, intente de nuevo porfavor.'
        });
        await alert.present();
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
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
        setTimeout(() => {
            alert.dismiss();
        }, 3000);
    }



    async alertMensajeFechas(mensajes: string[]) {
        //con boton de okay 
        let i = 0;
        for (i; i < mensajes.length; i++) {
            console.log(i + '---' + mensajes[i]);
        }
        const alert = await this.alertCtrl.create({
            header: 'Agregar',
            subHeader: 'Vacaciones',
            message: mensajes.toString()
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, 3000);
    }

    async alertGuardarFechas(mensajes: string[]) {
        //con boton de okay 
        let i = 0;
        for (i; i < mensajes.length; i++) {
            console.log(i + '---' + mensajes[i]);
        }
        const alert = await this.alertCtrl.create({
            header: 'Guardar',
            subHeader: 'Vacaciones',
            message: mensajes.toString()
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, 3000);
    }
    

    async alertDaysVoid() {
        const alert = await this.alertCtrl.create({
            header: 'Modificación',
            subHeader: 'Vacaciones',
            message: 'No se ha modificado ninguna fecha.'
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, 3000);
    }

    async alertErrorUpdate(err: any) {
        const alert = await this.alertCtrl.create({
            header: 'Modificación',
            subHeader: 'Error',
            message: err
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, 3000);
    }

    async alertReturnMessage(mensajes: string[]) {
        //con boton de okay 
        let i = 0;
        for (i; i < mensajes.length; i++) {
            console.log(i + '---' + mensajes[i]);
        }
        const alert = await this.alertCtrl.create({
            header: 'Modificación',
            subHeader: 'Vacaciones',
            message: mensajes.toString()
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, 3000);
    }

    

    async alertCommitUpdate(sendVacations: any) {

        const alert = await this.alertCtrl.create({
            header: 'Modificación',
            subHeader: 'Vacaciones',
            message: '¿Esta seguro de realizar esta opreación?',
            buttons: [{
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {                    
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        this.loadingCtrl
                           .create({ keyboardClose: true, message: 'Modificando fechas...' })
                           .then(loadingEl => {
                              loadingEl.present();
                              this.vacationsService.commitUpdate(sendVacations).subscribe((res: Response) => {                                 
                                 console.log(JSON.stringify(res));             
                                 const menssage = res['data'].mensajes;        
                                 this.alertReturnMessage(menssage);
                                 loadingEl.dismiss();
                              },
                              (err) => {
                                 this.alertErrorUpdate(err);
                                 loadingEl.dismiss();
                              });
                           });                        
                    }
                }
            ]
        });

        await alert.present();
    }

    async alertCommitCancel(sendVacations: any) {

        const alert = await this.alertCtrl.create({
            header: 'Cancelación',
            subHeader: 'Vacaciones',
            message: '¿Esta seguro de realizar esta opreación?',
            buttons: [{
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {                        
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        this.loadingCtrl
                           .create({ keyboardClose: true, message: 'Cancelando fechas...' })
                           .then(loadingEl => {
                              loadingEl.present();
                              this.vacationsService.commitCancel(sendVacations).subscribe((res: Response) => {                                 
                                 console.log(JSON.stringify(res));             
                                 const menssage = res['data'].mensajes;        
                                 this.alertReturnMessage(menssage);
                                 loadingEl.dismiss();
                              },
                              (err) => {
                                 this.alertErrorUpdate(err);
                                 loadingEl.dismiss();
                              });
                           });
                        //window.location.reload();
                    }
                }
            ]
        });

        await alert.present();
    }


}