import { Router } from '@angular/router';

export class UtilsNavigate {

 constructor(
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
 routerNavigateVacationsUpdate() {
  return this.router.navigateByUrl('/vacations/update');
 }
 routerNavigateVacationsCancel() {
  return this.router.navigateByUrl('/vacations/cancel');
 }

}
