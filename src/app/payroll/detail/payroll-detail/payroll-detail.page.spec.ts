import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollDetailPage } from './payroll-detail.page';

describe('PayrollDetailPage', () => {
  let component: PayrollDetailPage;
  let fixture: ComponentFixture<PayrollDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
