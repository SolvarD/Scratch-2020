import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../../models/profile';
import { ToolsService } from '../../../services/tools.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.less'],
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class ProfilComponent implements OnInit {
  profiles: Array<Profile> = [];
  proprietaire: Profile;
  constructor(private profileService: ProfileService) { }

  async ngOnInit() {
    this.profiles = (await this.profileService.getAll()).data;
    this.proprietaire = this.profiles.filter((profile) => { return profile.isPrincipal; })[0];
    console.log(this.profiles);
  }

  getCV(profile: Profile) {
    ToolsService.getCV(profile);
  }
}
