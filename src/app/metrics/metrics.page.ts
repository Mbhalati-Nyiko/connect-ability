import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metrics',
  templateUrl: 'metrics.page.html',
  styleUrls: ['metrics.page.scss'],
  standalone: false,
})
export class MetricsPage implements OnInit {
  subjects = [
    { name: 'Mathematics', grade: 78, term: 'Term 1' },
    { name: 'English', grade: 85, term: 'Term 1' },
    { name: 'Science', grade: 72, term: 'Term 1' },
    { name: 'History', grade: 88, term: 'Term 1' },
    { name: 'Geography', grade: 65, term: 'Term 1' }
  ];

  constructor() {}

  ngOnInit() {}

  getGradeClass(grade: number): string {
    if (grade >= 80) return 'grade-excellent';
    if (grade >= 70) return 'grade-good';
    if (grade >= 60) return 'grade-average';
    return 'grade-poor';
  }
}