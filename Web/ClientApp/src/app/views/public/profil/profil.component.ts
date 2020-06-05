import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../../models/profile';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.less']
})
export class ProfilComponent implements OnInit {
  profiles: Array<Profile> = [];
  proprietaire: Profile;
  constructor(private profileService: ProfileService) {}

  async ngOnInit() {
    this.profiles = await this.profileService.getAll();
    this.proprietaire = this.profiles.find((profile) => { return profile.isPrincipal; })
    console.log(this.profiles);
  }

  getCV(profile: Profile) {
    var byteArray = new Uint8Array(profile.cv.content);
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));

    // supply your own fileName here...
    a.download = "YourFileName.docx";

    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }
}
