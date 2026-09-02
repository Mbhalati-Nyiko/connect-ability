import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: false,
})
export class FaqPage implements OnInit {
  faqs = [
    {
      question: 'How do I apply for a bursary?',
      answer: 'To apply for a bursary, navigate to the Bursary & Education section from the home page. You can browse available bursaries and submit applications directly through the app.'
    },
    {
      question: 'How can I track my taxi?',
      answer: 'Go to the Transport section and select the "Track Taxi" tab. Enter your taxi route number to see real-time updates.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we take security seriously. All personal information is encrypted and stored securely. We use industry-standard encryption methods to protect your data.'
    },
    {
      question: 'Can I access the app offline?',
      answer: 'Yes, you can access some features offline. The app will sync your data when you reconnect to the internet.'
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to the "More" tab and select "Profile" to update your personal information, preferences, and settings.'
    }
  ];

  constructor() { }

  ngOnInit() {}
}