import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalLiteracyPage } from './digital-literacy.page';

describe('DigitalLiteracyPage', () => {
  let component: DigitalLiteracyPage;
  let fixture: ComponentFixture<DigitalLiteracyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalLiteracyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
