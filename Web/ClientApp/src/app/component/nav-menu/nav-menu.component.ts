import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../models/base-component';
import { ToolsService } from '../../services/tools.service';
import { ProfileService } from '../../services/profile.service';

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

  getCvOwner() {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(ToolsService.converBase64toBlob(ProfileService.owner.cv.content, ProfileService.owner.cv.type));
    a.download = ProfileService.owner.cv.title;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }
}
