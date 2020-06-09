import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from '../../../../models/profile';
import { ProfileService } from '../../../services/profile.service';
import { BaseComponent } from '../../../../models/base-component';
import { ToolsService } from '../../../services/tools.service';
import { AppDocument } from '../../../../models/document';

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
      profileId: [profile.profileId],
      documentId_Photo: [profile.documentId_Photo],
      documentId_CV: [profile.documentId_CV],
      isPrincipal: [profile.isPrincipal],
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
    this.profileService.update(profile);
    //profile.cv = form
  }
  changePhoto(formProfile: FormGroup, event, index: number) {
    let photo: File = event.target.files[0];
    let formControlName = 'photo';

    ToolsService.uploadFile(formProfile, formControlName, photo).subscribe((item) => {
      if (item.formControlName == formControlName) {
        this.profiles[index].photo.content = item.content;
      }
    });    
  }

  changeCV(formProfile: FormGroup, event) {
    let cv: File = event.target.files[0];
    ToolsService.uploadFile(formProfile, 'cv', cv);
  }  
}
