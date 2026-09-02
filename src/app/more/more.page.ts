import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'more',
  templateUrl: 'more.page.html',
  styleUrls: ['more.page.scss'],
  standalone: false,
})
export class MorePage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}