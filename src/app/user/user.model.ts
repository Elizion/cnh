export class User {
 constructor(
  public personId: number,
  public nombre: string,
  public numeroEmpleado: string,
  public unidad: string,
  public puesto: string,
  public codigoPuesto: string,
  public cargo: string,
  public nivel: string,
  public rfc: string,
  public fechaIngresoFormat: string,
  public fotoBase64: string
 ) {}
}
