import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { DataService } from '../../../service/dataSharingComponentService/data.service';
import { AES } from 'crypto-js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public dropdown: boolean = false;
  public loginText: string = 'Log In';
  constructor(
    private route: Router,
    private dataSharingService: DataService,
  ) {}

  async ngOnInit() {}

  goToLogin() {
    localStorage.setItem(
      'lastPage',
      AES.encrypt(this.route.url, 'key').toString(),
    );
    this.route.navigate(['login']);
  }

  @HostListener('document:click', ['$event'])
  closePopUp(event: any) {
    const isDropdownClicked = !!event.target.closest('.dropdown');
    const isProfileClicked = !!event.target.closest('.profile');

    if (!isDropdownClicked && !isProfileClicked) {
      this.dropdown = false;
      console.log(this.dropdown);
    }
  }

  click(check: string) {
    switch (check) {
      case 'pd':
        this.dataSharingService.scrollTo('#bestSellingProducts');
        break;
      case 'in':
        this.dataSharingService.scrollTo('#topInfluencers');
        break;
      case 'fe':
        this.dataSharingService.scrollTo('#featuredCategory');
        break;
      case 'lo':
        this.dropdown = !this.dropdown;
        break;
      default:
        console.log('error');
        break;
    }
  }
}
