import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../models/base-component';
import { ToolsService } from '../../services/tools.service';
import { CommonModule } from '@angular/common';
import { MultiLanguageComponent } from '../multi-language/multi-language.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    standalone: true,
    imports:[CommonModule, MultiLanguageComponent, LoginComponent, RouterModule, TranslateModule]
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

  getCvOwner() {
    ToolsService.getCV();
  }
}
