import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BursaryEducationPage } from './bursary-education.page';

describe('BursaryEducationPage', () => {
  let component: BursaryEducationPage;
  let fixture: ComponentFixture<BursaryEducationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BursaryEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
