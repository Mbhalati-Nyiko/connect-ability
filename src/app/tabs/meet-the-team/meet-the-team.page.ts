import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meet-the-team',
  templateUrl: './meet-the-team.page.html',
  styleUrls: ['./meet-the-team.page.scss'],
  standalone: false,
})
export class MeetTheTeamPage implements OnInit {
  teamMembers = [
    {
      name: 'Thabo Mokoena',
      role: 'Project Lead',
      bio: 'Passionate about education technology and community development'
    },
    {
      name: 'Sarah van der Merwe',
      role: 'Developer',
      bio: 'Full-stack developer focused on creating accessible solutions'
    },
    {
      name: 'Lerato Ndlovu',
      role: 'UX Designer',
      bio: 'Designing intuitive experiences for young learners'
    },
    {
      name: 'David Johnson',
      role: 'Community Liaison',
      bio: 'Building connections between the app and community partners'
    }
  ];

  constructor() { }

  ngOnInit() {}
}