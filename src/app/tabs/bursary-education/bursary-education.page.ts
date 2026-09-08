import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bursary-education',
  templateUrl: './bursary-education.page.html',
  styleUrls: ['./bursary-education.page.scss'],
  standalone: false,
})
export class BursaryEducationPage implements OnInit {
  activeSection: string = '';

  // University data
  universities = [
    {
      name: 'University of the Witwatersrand (Wits)',
      type: 'Public',
      location: 'Johannesburg, Gauteng',
      description: 'A leading African university known for excellence in research, teaching, and learning.',
      established: '1922',
      students: '40,000+',
      programs: '300+',
      faculties: ['Commerce', 'Engineering', 'Health Sciences', 'Humanities', 'Science'],
      website: 'https://www.wits.ac.za'
    },
    {
      name: 'University of Johannesburg (UJ)',
      type: 'Public',
      location: 'Johannesburg, Gauteng',
      description: 'A vibrant, comprehensive university offering a wide range of programs across multiple campuses.',
      established: '2005',
      students: '50,000+',
      programs: '200+',
      faculties: ['Art, Design & Architecture', 'Business & Economics', 'Engineering', 'Health Sciences', 'Humanities', 'Science'],
      website: 'https://www.uj.ac.za'
    },
    {
      name: 'University of Pretoria (UP)',
      type: 'Public',
      location: 'Pretoria, Gauteng',
      description: 'One of South Africa\'s largest research universities with a strong reputation for academic excellence.',
      established: '1908',
      students: '53,000+',
      programs: '400+',
      faculties: ['Economic & Management Sciences', 'Engineering', 'Health Sciences', 'Humanities', 'Law', 'Natural Sciences'],
      website: 'https://www.up.ac.za'
    },
    {
      name: 'University of Cape Town (UCT)',
      type: 'Public',
      location: 'Cape Town, Western Cape',
      description: 'Africa\'s highest-ranked university, known for cutting-edge research and academic excellence.',
      established: '1829',
      students: '29,000+',
      programs: '200+',
      faculties: ['Commerce', 'Engineering', 'Health Sciences', 'Humanities', 'Law', 'Science'],
      website: 'https://www.uct.ac.za'
    },
    {
      name: 'Stellenbosch University (SU)',
      type: 'Public',
      location: 'Stellenbosch, Western Cape',
      description: 'A prestigious university with a strong focus on research and innovation.',
      established: '1918',
      students: '32,000+',
      programs: '250+',
      faculties: ['AgriSciences', 'Economic & Management Sciences', 'Engineering', 'Law', 'Science'],
      website: 'https://www.sun.ac.za'
    }
  ];

  // College data
  colleges = [
    {
      name: 'Ekurhuleni East TVET College',
      type: 'TVET',
      location: 'Gauteng',
      description: 'Offering vocational and occupational education in various fields to prepare students for the workplace.',
      established: '2002',
      programs: '40+',
      duration: '1-3 years',
      courses: ['Business Studies', 'Engineering', 'Information Technology', 'Tourism', 'Hospitality'],
      website: 'https://eecollege.co.za'
    },
    {
      name: 'Soweto TVET College',
      type: 'TVET',
      location: 'Soweto, Gauteng',
      description: 'Providing quality vocational education and training in the Soweto community.',
      established: '2004',
      programs: '35+',
      duration: '1-3 years',
      courses: ['Business Studies', 'Engineering', 'Information Technology', 'Tourism', 'Creative Arts'],
      website: 'https://www.sowetotvet.co.za'
    },
    {
      name: 'Vaal University of Technology (VUT)',
      type: 'University of Technology',
      location: 'Vanderbijlpark, Gauteng',
      description: 'A university of technology offering career-focused education and training.',
      established: '1966',
      programs: '150+',
      duration: '3-4 years',
      courses: ['Engineering', 'Information Technology', 'Management Sciences', 'Human Sciences'],
      website: 'https://www.vut.ac.za'
    },
    {
      name: 'South West Gauteng TVET College',
      type: 'TVET',
      location: 'Johannesburg, Gauteng',
      description: 'Committed to providing accessible, quality vocational education.',
      established: '2003',
      programs: '30+',
      duration: '1-3 years',
      courses: ['Business Studies', 'Engineering', 'Hospitality', 'Tourism', 'Information Technology'],
      website: 'https://www.swgc.co.za'
    },
    {
      name: 'Damelin College',
      type: 'Private',
      location: 'Various locations, South Africa',
      description: 'Private higher education institution offering a wide range of accredited programs.',
      established: '1943',
      programs: '100+',
      duration: '1-3 years',
      courses: ['Business Management', 'Information Technology', 'Law', 'Education', 'Creative Arts'],
      website: 'https://www.damelin.co.za'
    }
  ];

  // University bursaries
  universityBursaries = [
    {
      name: 'NSFAS University Bursary',
      provider: 'National Student Financial Aid Scheme',
      description: 'Government funding program for students from low-income households.',
      amount: 'Up to R100,000/year',
      deadline: 'January 31',
      fields: 'All fields of study',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Household income below R350,000/year',
        'Good academic standing',
        'Accepted at a public university'
      ],
      website: 'https://www.nsfas.org.za'
    },
    {
      name: 'MTN Foundation Scholarship',
      provider: 'MTN Group',
      description: 'Scholarships for students pursuing ICT-related programs.',
      amount: 'R50,000 - R100,000/year',
      deadline: 'September 30',
      fields: 'ICT, Engineering, Technology',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Minimum 65% average',
        'Pursuing ICT-related degree',
        'Academic excellence'
      ],
      website: 'https://www.mtnfoundation.co.za'
    },
    {
      name: 'The Mandela Rhodes Scholarship',
      provider: 'Mandela Rhodes Foundation',
      description: 'Prestigious scholarship for leadership development.',
      amount: 'Full tuition + living expenses',
      deadline: 'April 15',
      fields: 'All fields of study',
      status: 'Open',
      requirements: [
        'South African citizen under 26',
        'Minimum 70% average',
        'Demonstrated leadership potential',
        'Commitment to community service'
      ],
      website: 'https://www.mandelarhodes.org'
    },
    {
      name: 'Anglo American Bursary',
      provider: 'Anglo American',
      description: 'For students in mining-related fields.',
      amount: 'Full tuition + accommodation',
      deadline: 'June 30',
      fields: 'Mining, Engineering, Geology',
      status: 'Closing Soon',
      requirements: [
        'South African citizen',
        'Minimum 60% in Mathematics and Science',
        'Enrolled in mining-related program',
        'Financial need'
      ],
      website: 'https://www.angloamerican.com'
    },
    {
      name: 'Eskom Bursary',
      provider: 'Eskom',
      description: 'For students interested in engineering and energy sector.',
      amount: 'R100,000+/year',
      deadline: 'August 31',
      fields: 'Engineering, Energy, Technology',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Minimum 65% average',
        'Pursuing engineering degree',
        'Good academic record'
      ],
      website: 'https://www.eskom.co.za'
    }
  ];

  // College bursaries
  collegeBursaries = [
    {
      name: 'NSFAS TVET College Bursary',
      provider: 'National Student Financial Aid Scheme',
      description: 'Government funding for TVET college students.',
      amount: 'Up to R50,000/year',
      deadline: 'January 31',
      fields: 'All fields of study',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Household income below R350,000/year',
        'Accepted at a public TVET college',
        'Passed Grade 12'
      ],
      website: 'https://www.nsfas.org.za'
    },
    {
      name: 'SETA College Bursary',
      provider: 'Various SETAs',
      description: 'Bursaries for vocational and technical education.',
      amount: 'R30,000 - R80,000/year',
      deadline: 'Varies per SETA',
      fields: 'Various - engineering, ICT, business',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Enrolled in SETA-aligned program',
        'Minimum 60% average',
        'Financial need'
      ],
      website: 'https://www.seta.org.za'
    },
    {
      name: 'IBM Technical Bursary',
      provider: 'IBM South Africa',
      description: 'For students pursuing ICT and technical programs.',
      amount: 'R40,000 - R100,000/year',
      deadline: 'July 31',
      fields: 'Information Technology, Computer Science',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Enrolled in ICT program',
        'Minimum 65% average',
        'Technical aptitude'
      ],
      website: 'https://www.ibm.com'
    },
    {
      name: 'MerSETA Bursary',
      provider: 'Manufacturing, Engineering and Services SETA',
      description: 'For students in manufacturing and engineering fields.',
      amount: 'R50,000 - R100,000/year',
      deadline: 'November 30',
      fields: 'Engineering, Manufacturing, Technology',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Enrolled in engineering program',
        'Minimum 60% average',
        'Financial need'
      ],
      website: 'https://www.merseta.org.za'
    },
    {
      name: 'FOODBEV SETA Bursary',
      provider: 'Food and Beverage Manufacturing SETA',
      description: 'For students in food production and related fields.',
      amount: 'R30,000 - R60,000/year',
      deadline: 'October 31',
      fields: 'Food Technology, Hospitality, Production',
      status: 'Open',
      requirements: [
        'South African citizen',
        'Enrolled in food-related program',
        'Minimum 55% average',
        'Financial need'
      ],
      website: 'https://www.foodbev.co.za'
    }
  ];

  constructor() {}

  ngOnInit() {}

  toggleSection(section: string) {
    if (this.activeSection === section) {
      this.activeSection = '';
    } else {
      this.activeSection = section;
    }
  }

  openWebsite(url: string) {
    window.open(url, '_blank');
  }

  getDeadlineClass(deadline: string): string {
    // Simple logic to determine urgency based on deadline text
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();

    // For simplicity, check if deadline is in the next 2 months
    if (deadline.includes('January') && month > 10) return 'urgent';
    if (deadline.includes('September') && month >= 7) return 'urgent';
    if (deadline.includes('August') && month >= 6) return 'urgent';
    if (deadline.includes('July') && month >= 5) return 'urgent';
    if (deadline.includes('June') && month >= 4) return 'urgent';
    if (deadline.includes('November') && month >= 9) return 'urgent';
    return '';
  }
}
