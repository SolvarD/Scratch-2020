import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
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
