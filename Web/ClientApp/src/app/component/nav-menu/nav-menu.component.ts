import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../models/base-component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent extends BaseComponent {
  constructor() {
    super();
  }
  isExpanded = false;
  isExpandedStack = false;

  collapse() {
    this.isExpanded = false;
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  toggleStack() {
    this.isExpandedStack = !this.isExpandedStack;
  }
}
