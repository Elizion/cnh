import { AlertController } from '@ionic/angular';
export class UtilsMessage {
    timeOk: any = 3000;
    timeError: any = 4000;
    timeArray: any = 6000;
    constructor(
        private alertCtrl: AlertController
    ) {}
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
    async messageGeneric(messageError: string, className: string, methodName: string) {
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
    async messageParamethersArray(mensajes: string[], className: string, methodName: string) {
        let i = 0;
        for (i; i < mensajes.length; i++) {
            console.log(i + '---' + mensajes[i]);
        }
        const alert = await this.alertCtrl.create({
            header: className,
            subHeader: methodName,
            message: mensajes.toString()
        });
        await alert.present();
        setTimeout(() => {
            alert.dismiss();
        }, this.timeArray);
    }
    messageCharging() {
        return 'Cargando...';
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
}
