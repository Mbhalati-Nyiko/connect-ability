import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportationPage } from './transportation.page';

describe('TransportationPage', () => {
  let component: TransportationPage;
  let fixture: ComponentFixture<TransportationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
