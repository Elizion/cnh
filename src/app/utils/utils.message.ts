import { AlertController } from '@ionic/angular';
export class UtilsMessage {

    timeOk: any = 5000;
    timeError: any = 4000;
    timeArray: any = 6000;

    constructor(
        private alertCtrl: AlertController
    ) {}

    async messageOkTemp(messageOk: string, className: string, methodName: string) {
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

    async messageApiOk(messageOk: string, className: string, methodName: string) {
        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            message: messageOk,
            buttons: ['Aceptar']
        });
        await alert.present();
        /*
        setTimeout(() => {
            alert.dismiss();
        }, this.timeOk);
        */
    }
    async messageApiError(messageError: string, className: string, methodName: string) {
        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            message: messageError,
            buttons: ['Aceptar']
        });
        await alert.present();
        /*
        setTimeout(() => {
            alert.dismiss();
        }, this.timeError);
        */
    }
    async messageGeneric(messageError: string, className: string, methodName: string) {
        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            message: messageError,
            buttons: ['Aceptar']
        });
        await alert.present();
        /*
        setTimeout(() => {
            alert.dismiss();
        }, this.timeError);
        */
    }
    async messageParamethersArray(mensajes: string[], className: string, methodName: string) {

        let i = 0;
        let row = '';

        for (i; i < mensajes.length; i++) {
            row += '<li>' + mensajes[i] + '</li>';
        }

        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            //message: mensajes.toString(),
            message: '<ul>' + row + '</ul>',
            buttons: ['Aceptar']
        });
        await alert.present();
        /*setTimeout(() => {
            alert.dismiss();
        }, this.timeArray);*/
    }
    messageCharging() {
        return 'Cargando...';
    }
    messageSaving() {
        return 'Guardando...';
    }
    messageDownloading() {
        return 'Descargando...';
    }
    messageValidating() {
        return 'Validando...';
    }
    messageUpdating() {
        return 'Actualizando...';
    }
    messageCanceling() {
        return 'Cancelando...';
    }
    messageNotAvaible() {
        return 'No disponible.';
    }
    messageListVoid() {
        return 'Lista vacia.';
    }
    messageSelectList() {
        return 'Seleccione al menos un fecha.';
    }
    messageOk() {
        return 'Se ha guardado la información de manera correcta.';
    }
}
