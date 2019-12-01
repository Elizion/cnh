import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacationsPage } from './vacations.page';

describe('VacationsPage', () => {
  let component: VacationsPage;
  let fixture: ComponentFixture<VacationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
