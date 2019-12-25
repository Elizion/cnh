import { AlertController } from '@ionic/angular';

export class UtilsMessage {

    constructor(
        private alertCtrl: AlertController
    ) {}

    timeOk: any = 3000;
    timeError: any = 4000;

    async messageApiOk(messageOk: string, className: string, methodName: string) {
        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            message: messageOk
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, this.timeOk);
    }

    async messageApiError(messageError: string, className: string, methodName: string) {
        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            message: messageError
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, this.timeError);
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

}
