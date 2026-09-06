import { Component, OnInit } from '@angular/core';

interface Subject {
  name: string;
  grade: number;
  term?: string;
}

interface Course {
  name: string;
  description: string;
  requirements: string;
  selected: boolean;
}

interface Faculty {
  name: string;
  courses: Course[];
}

@Component({
  selector: 'metrics',
  templateUrl: 'metrics.page.html',
  styleUrls: ['metrics.page.scss'],
  standalone: false,
})
export class MetricsPage implements OnInit {
  // Step management
  currentStep: number = 1;

  // Subject inputs
  newSubjectName: string = '';
  newSubjectMark: number | null = null;
  subjects: Subject[] = [];

  // Faculty and courses
  selectedFaculty: string = '';
  faculties: Faculty[] = [];

  constructor() {
    this.initializeFaculties();
  }

  ngOnInit() {}

  initializeFaculties() {
    this.faculties = [
      {
        name: 'Commerce',
        courses: [
          {
            name: 'BCom Accounting',
            description: 'Study financial management, auditing, and taxation',
            requirements: 'Mathematics 70%+, Accounting 70%+',
            selected: false
          },
          {
            name: 'BCom Economics',
            description: 'Understand economic systems and policy making',
            requirements: 'Mathematics 65%+',
            selected: false
          },
          {
            name: 'BCom Management',
            description: 'Learn business strategy and organizational leadership',
            requirements: 'Mathematics 60%+, English 60%+',
            selected: false
          },
          {
            name: 'BCom Marketing',
            description: 'Study consumer behavior and brand management',
            requirements: 'English 60%+',
            selected: false
          }
        ]
      },
      {
        name: 'Science & Engineering',
        courses: [
          {
            name: 'BSc Engineering',
            description: 'Civil, mechanical, or electrical engineering',
            requirements: 'Mathematics 80%+, Science 75%+',
            selected: false
          },
          {
            name: 'BSc Computer Science',
            description: 'Programming, algorithms, and software development',
            requirements: 'Mathematics 70%+, Science 65%+',
            selected: false
          },
          {
            name: 'BSc Information Technology',
            description: 'Network systems, cybersecurity, and IT management',
            requirements: 'Mathematics 65%+, English 60%+',
            selected: false
          },
          {
            name: 'BSc Health Sciences',
            description: 'Pre-medical or health-related studies',
            requirements: 'Science 70%+, Mathematics 65%+',
            selected: false
          }
        ]
      },
      {
        name: 'Arts & Humanities',
        courses: [
          {
            name: 'BA Law',
            description: 'Study legal systems and justice',
            requirements: 'English 70%+, History/Geography 65%+',
            selected: false
          },
          {
            name: 'BA Psychology',
            description: 'Study human behavior and mental processes',
            requirements: 'English 65%+',
            selected: false
          },
          {
            name: 'BA Journalism',
            description: 'Media writing, reporting, and communication',
            requirements: 'English 70%+',
            selected: false
          },
          {
            name: 'BA Education',
            description: 'Teaching and educational leadership',
            requirements: 'English 60%+, Mathematics 55%+',
            selected: false
          }
        ]
      }
    ];
  }

  // Step navigation
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      // Ensure faculty selection is reset when moving forward
      if (this.currentStep === 2) {
        // Reset any previous selection
        this.faculties.forEach(faculty => {
          faculty.courses.forEach(course => course.selected = false);
        });
        this.selectedFaculty = '';
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Subject management
  addSubject() {
    if (this.newSubjectName && this.newSubjectMark !== null) {
      // Check if subject already exists
      const exists = this.subjects.some(
        s => s.name.toLowerCase() === this.newSubjectName.toLowerCase()
      );

      if (!exists) {
        this.subjects.push({
          name: this.newSubjectName,
          grade: this.newSubjectMark,
          term: `Term ${this.subjects.length + 1}`
        });
        this.newSubjectName = '';
        this.newSubjectMark = null;
      } else {
        alert('This subject has already been added.');
      }
    }
  }

  removeSubject(index: number) {
    this.subjects.splice(index, 1);
  }

  // Faculty and course methods
  onFacultyChange() {
    // Reset all course selections when faculty changes
    this.faculties.forEach(faculty => {
      faculty.courses.forEach(course => course.selected = false);
    });
  }

  getCoursesForFaculty(facultyName: string): Course[] {
    const faculty = this.faculties.find(f => f.name === facultyName);
    return faculty ? faculty.courses : [];
  }

  hasSelectedCourses(): boolean {
    let hasSelection = false;
    this.faculties.forEach(faculty => {
      faculty.courses.forEach(course => {
        if (course.selected) hasSelection = true;
      });
    });
    return hasSelection;
  }

  // Complete form and show results
  completeForm() {
    this.currentStep = 3;
  }

  // Results calculations
  getOverallAverage(): number {
    if (this.subjects.length === 0) return 0;
    const total = this.subjects.reduce((sum, subject) => sum + subject.grade, 0);
    return Math.round(total / this.subjects.length);
  }

  getGradeClass(grade: number): string {
    if (grade >= 80) return 'grade-excellent';
    if (grade >= 70) return 'grade-good';
    if (grade >= 60) return 'grade-average';
    return 'grade-poor';
  }

  getBursaryEligibility() {
    const avg = this.getOverallAverage();
    let eligible = 0;
    let total = 0;
    let pending = 0;

    // Simulated bursary eligibility based on averages
    const bursaries = [
      { name: 'NSFAS', requirement: 60 },
      { name: 'Merit Scholarship', requirement: 75 },
      { name: 'Community Bursary', requirement: 65 },
      { name: 'Sports Excellence', requirement: 70 },
      { name: 'Science Achievement', requirement: 70 }
    ];

    bursaries.forEach(bursary => {
      total++;
      if (avg >= bursary.requirement) {
        eligible++;
      } else {
        pending++;
      }
    });

    return { total, eligible, pending };
  }

  getQualifiedCourses() {
    const avg = this.getOverallAverage();
    const qualified: Course[] = [];

    this.faculties.forEach(faculty => {
      faculty.courses.forEach(course => {
        if (course.selected && this.isStudentQualified(course, avg)) {
          qualified.push(course);
        }
      });
    });

    return qualified;
  }

  isStudentQualified(course: Course, avg: number): boolean {
    // Parse requirements to check eligibility
    const requirements = course.requirements.toLowerCase();

    if (requirements.includes('mathematics') || requirements.includes('maths')) {
      const mathSubject = this.subjects.find(s =>
        s.name.toLowerCase().includes('math')
      );
      if (mathSubject) {
        const required = this.extractRequirement(requirements, 'math');
        if (required && mathSubject.grade < required) {
          return false;
        }
      } else {
        return false;
      }
    }

    if (requirements.includes('english')) {
      const englishSubject = this.subjects.find(s =>
        s.name.toLowerCase().includes('english')
      );
      if (englishSubject) {
        const required = this.extractRequirement(requirements, 'english');
        if (required && englishSubject.grade < required) {
          return false;
        }
      } else {
        return false;
      }
    }

    if (requirements.includes('science')) {
      const scienceSubject = this.subjects.find(s =>
        s.name.toLowerCase().includes('science') ||
        s.name.toLowerCase().includes('physics') ||
        s.name.toLowerCase().includes('chemistry') ||
        s.name.toLowerCase().includes('biology')
      );
      if (scienceSubject) {
        const required = this.extractRequirement(requirements, 'science');
        if (required && scienceSubject.grade < required) {
          return false;
        }
      } else {
        return false;
      }
    }

    if (requirements.includes('history') || requirements.includes('geography')) {
      const humanitiesSubject = this.subjects.find(s =>
        s.name.toLowerCase().includes('history') ||
        s.name.toLowerCase().includes('geography')
      );
      if (humanitiesSubject) {
        const required = this.extractRequirement(requirements, 'history');
        if (required && humanitiesSubject.grade < required) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  extractRequirement(requirements: string, subject: string): number | null {
    const regex = new RegExp(`${subject}[\\s]*([0-9]+)`, 'i');
    const match = requirements.match(regex);
    if (match && match[1]) {
      return parseInt(match[1]);
    }
    return null;
  }

  getImprovementTips(): string[] {
    const tips: string[] = [];
    const avg = this.getOverallAverage();

    if (avg < 60) {
      tips.push('Focus on core subjects - identify your weakest subjects and seek extra help');
      tips.push('Create a study schedule and stick to it');
      tips.push('Join study groups with classmates');
      tips.push('Practice past exam papers regularly');
    } else if (avg < 70) {
      tips.push('Good work! Focus on improving your weaker subjects');
      tips.push('Consider getting a tutor for challenging subjects');
      tips.push('Review your mistakes and learn from them');
      tips.push('Set specific goals for each subject');
    } else if (avg < 80) {
      tips.push('Excellent progress! Aim for excellence in all subjects');
      tips.push('Challenge yourself with advanced problems');
      tips.push('Help classmates to reinforce your own understanding');
      tips.push('Consider applying for merit scholarships');
    } else {
      tips.push('Outstanding performance! Keep up the great work');
      tips.push('You qualify for most programs - research your options carefully');
      tips.push('Apply for all relevant scholarships and bursaries');
      tips.push('Consider mentorship opportunities for other students');
    }

    // Add subject-specific tips
    this.subjects.forEach(subject => {
      if (subject.grade < 60) {
        tips.push(`📖 ${subject.name}: Seek extra help and practice more exercises`);
      }
    });

    return tips.slice(0, 5); // Limit to 5 tips
  }

  resetForm() {
    this.currentStep = 1;
    this.subjects = [];
    this.newSubjectName = '';
    this.newSubjectMark = null;
    this.selectedFaculty = '';
    this.faculties.forEach(faculty => {
      faculty.courses.forEach(course => course.selected = false);
    });
  }
}
