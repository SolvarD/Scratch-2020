import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  elements: Array<any> = [];
  sizeIcon: string = 'fa-7x';
  ngOnInit(): void {
    this.elements = [
      { title: 'PROFIL', route: '/profil', class: `fas fa-id-card ${this.sizeIcon}`},
      { title: 'SKILLS', route: '/skills', class: `fas fa-suitcase ${this.sizeIcon}` },
      { title: 'PORTE_FOLIO', route: '/porte-folio', class: `fas fa-building ${this.sizeIcon}` },
      { title: 'PRICES', route: '/prices', class: `fas fa-money-check-alt ${this.sizeIcon}` },
      { title: 'CONTACT_US', route: '/contact', class: `fas fa-envelope ${this.sizeIcon}` }
    ];
  }

}
