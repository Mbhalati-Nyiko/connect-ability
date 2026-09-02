import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  standalone: false,
})
export class PreferencesPage implements OnInit {
  preferences = {
    notifications: true,
    darkMode: false,
    dataSaver: false,
    language: 'en',
    contentLanguage: 'en'
  };

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const savedPreferences = await this.storage.get('preferences');
    if (savedPreferences) {
      this.preferences = savedPreferences;
    }
  }

  async savePreferences() {
    await this.storage.set('preferences', this.preferences);
    
    if (this.preferences.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}