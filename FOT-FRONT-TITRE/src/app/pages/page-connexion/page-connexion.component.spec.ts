import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionComponent } from './page-connexion.component';

describe('PageConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnexionComponent],
    });
    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
