export class UtilsHidden {

 visible: boolean;

 constructor() {}

 visibleContent() {
  return this.visible = true;
 }

 unVisibleContent() {
  return this.visible = false;
 }

}
