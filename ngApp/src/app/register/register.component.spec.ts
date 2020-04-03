import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({
      registerUser: registerUserData => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegisterComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('can load instance', () => {
    fixture.detectChanges();
    component.ngOnInit();
  });
  describe('registerUser', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'registerUser').and.callThrough();
      component.registerUser();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.registerUser).toHaveBeenCalled();
    });
  });
});
