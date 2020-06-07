import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../../models/profile';
import { ToolsService } from '../../../services/tools.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.less']
})
export class ProfilComponent implements OnInit {
  profiles: Array<Profile> = [];
  proprietaire: Profile;
  constructor(private profileService: ProfileService) { }

  async ngOnInit() {
    this.profiles = await this.profileService.getAll();
    this.proprietaire = this.profiles.filter((profile) => { return profile.isPrincipal; })[0];
    console.log(this.profiles);
  }

  getCV(profile: Profile) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(ToolsService.converBase64toBlob(profile.cv.content, profile.cv.type));
    a.download = profile.cv.title;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }
}
