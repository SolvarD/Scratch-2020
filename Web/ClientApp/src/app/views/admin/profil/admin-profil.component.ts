import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from '../../../../models/profile';
import { ProfileService } from '../../../services/profile.service';
import { BaseComponent } from '../../../../models/base-component';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.less']
})

export class AdminProfilComponent extends BaseComponent implements OnInit {

  profiles: Profile[] = [];
  formProfiles: FormGroup[] = [];

  constructor(private _fb: FormBuilder, private profileService: ProfileService) { super(); }

  async ngOnInit() {
    this.profiles = await this.profileService.getAll();
    this.profiles.forEach((profile) => {
      this.formProfiles.push(this.buildForm(profile));
    });
  }

  buildForm(profile: Profile) {
    return this._fb.group({
      documentId: [profile.profileId],
      presentation: [{ value: profile.presentation, disabled: !this.canEdit }],
      pastPro: [{ value: profile.pastPro, disabled: !this.canEdit }],
      whyMe: [{ value: profile.whyMe, disabled: !this.canEdit }],
      advantage: [{ value: profile.advantage, disabled: !this.canEdit }],
      price: [{ value: profile.price, disabled: !this.canEdit }],
      photo: this._fb.group({
        documentId: [profile.photo.documentId],
        title: [profile.photo.title],
        content: [profile.photo.content],
        type: [profile.photo.type],
        created: [profile.photo.created]
      }),
      cv: this._fb.group({
        documentId: [profile.cv.documentId],
        title: [profile.cv.title],
        content: [profile.cv.content],
        type: [profile.cv.type],
        created: [profile.cv.created]
      })
    });
  }

  isValidField() {
    return true;
  }

  onSubmit(form: FormGroup, index: number) {
    let profile = form.value as Profile;
    console.log(profile);
    //profile.cv = form
  }
  changePhoto(formProfile: FormGroup, event) {
    console.log(event.target.files)
  }
  changeCV(formProfile: FormGroup, event) {
    console.log(event.target.files)
  }
}
