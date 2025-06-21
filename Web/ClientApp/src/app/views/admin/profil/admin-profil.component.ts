import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Profile } from '../../../../models/profile';
import { ProfileService } from '../../../services/profile.service';
import { BaseComponent } from '../../../../models/base-component';
import { ToolsService } from '../../../services/tools.service';
import { DocumentService } from '../../../services/document.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-admin-profil',
    templateUrl: './admin-profil.component.html',
    styleUrls: ['./admin-profil.component.less'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, TranslateModule]
})

export class AdminProfilComponent extends BaseComponent implements OnInit {

  profiles: Profile[] = [];
  formProfiles: UntypedFormGroup[] = [];
  files: { photo: File, cv: File } = { photo: null, cv: null };

  constructor(private _fb: UntypedFormBuilder, private profileService: ProfileService, private documentService: DocumentService) { super(); }

  async ngOnInit() {
    this.profiles = (await this.profileService.getAll()).data;
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
      presentation: [{ value: profile.presentation || '', disabled: !this.canEdit }],
      pastPro: [{ value: profile.pastPro || '', disabled: !this.canEdit }],
      whyMe: [{ value: profile.whyMe || '', disabled: !this.canEdit }],
      advantage: [{ value: profile.advantage || '', disabled: !this.canEdit }],
      price: [{ value: profile.price || 0, disabled: !this.canEdit }],
      //photo: this._fb.group({
      //  documentId: [profile.photo.documentId],
      //  title: [profile.photo.title],
      //  documentBase64: [profile.photo.documentBase64],
      //  type: [profile.photo.type],
      //  created: [profile.photo.created]
      //}),
      //cv: this._fb.group({
      //  documentId: [profile.cv.documentId],
      //  title: [profile.cv.title],
      //  documentBase64: [profile.cv.documentBase64],
      //  type: [profile.cv.type],
      //  created: [profile.cv.created]
      //})
    });
  }

  isValidField() {
    return true;
  }

  async onSubmit(form: UntypedFormGroup) {

    const formData = new FormData();

    for (const key of Object.keys(this.files)) {
      if (this.files[key]) {
        formData.append(key, this.files[key]);
      }      
    }

    let profile = form.value as Profile;
    Object.keys(profile).forEach(key => {
      if (key != 'cv' && key != 'photo') {
        formData.append(key, profile[key]);
      }      
    });

    this.profileService.update(formData);
  }
  changePhoto(event, index: number) {
    this.files.photo = event.target.files[0];
    let formControlName = 'photo';

    ToolsService.uploadFile(formControlName, this.files.photo).subscribe((item) => {
      if (item.formControlName == formControlName) {
        this.profiles[index].photo.documentBase64 = item.content.split(',')[1];
      }
    });
  }

  changeCV(event) {
    this.files.cv = event.target.files[0];
    ToolsService.uploadFile('cv', this.files.cv);
  }
}
