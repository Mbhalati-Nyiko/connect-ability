import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.page.html',
  styleUrls: ['./transportation.page.scss'],
  standalone: false,
})
export class TransportationPage implements OnInit {
  currentTab: string = 'routes';
  savedRoutes: any[] = [];
  newRoute = {
    routeName: '',
    from: '',
    to: '',
    fare: 0,
    duration: 0
  };
  
  trackingRoute: string = '';
  isTracking: boolean = false;
  taxiStatus: string = '';
  taxiEta: string = '';

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadSavedRoutes();
  }

  switchTab(tab: string) {
    this.currentTab = tab;
  }

  async loadSavedRoutes() {
    this.savedRoutes = (await this.storage.get('savedRoutes')) || [];
  }

  async saveRoute() {
    if (this.newRoute.routeName && this.newRoute.from && this.newRoute.to) {
      this.savedRoutes.push({ ...this.newRoute });
      await this.storage.set('savedRoutes', this.savedRoutes);
      this.resetNewRoute();
      this.currentTab = 'routes';
    }
  }

  resetNewRoute() {
    this.newRoute = {
      routeName: '',
      from: '',
      to: '',
      fare: 0,
      duration: 0
    };
  }

  trackTaxi() {
    if (this.trackingRoute) {
      this.isTracking = true;
      // Simulate tracking (in a real app, this would connect to a taxi tracking API)
      this.taxiStatus = 'On Time';
      this.taxiEta = '15 minutes';
    }
  }
}