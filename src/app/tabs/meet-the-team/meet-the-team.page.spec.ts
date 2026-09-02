import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetTheTeamPage } from './meet-the-team.page';

describe('MeetTheTeamPage', () => {
  let component: MeetTheTeamPage;
  let fixture: ComponentFixture<MeetTheTeamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetTheTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
