export abstract class Constants {

  static readonly PROTOCOL: string = 'https://';
  static readonly HOST: string = 'siarhqamovil.cnh.gob.mx/';
  static readonly BASE: string = 'api/';
  static readonly MODULE: string[] = ['token/', 'empleado/', 'vacaciones/', 'avisos/', 'recibo/'];
  static readonly ONE: number = 1;
  static readonly TWO: number = 2;
  static readonly THREE: number = 3;
  static readonly SIZE_BUFFER: number = 512;
  static readonly APPLICATION_JSON: string = 'application/json; charset=UTF-8';
  static readonly X_WWW_FORM_URLENCODED: string = 'application/x-www-form-urlencoded; charset=UTF-8';
  static readonly APPLICATION_PDF: string = 'application/pdf';
  static readonly APPLICATION_XLS: string = 'application/vdn.ms-excel';
  static readonly APPLICATION_XLSX: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.template';
  static readonly APPLICATION_DOC: string = 'application/msword';
  static readonly APPLICATION_DOCX: string = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  static readonly APPLICATION_JPG: string = 'image/jpg';
  static readonly APPLICATION_JPEG: string = 'image/jpeg';
  static readonly APPLICATION_PNG: string = 'image/png';
  static readonly APPLICATION_TXT: string = 'text/plain';

}