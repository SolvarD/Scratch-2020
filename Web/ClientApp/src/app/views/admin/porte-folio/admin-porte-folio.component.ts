import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../../models/experience';
import { BaseComponent } from '../../../../models/base-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SkillCategoryDetail, SkillCategory } from '../../../../models/skill';
import { DatePipe } from '@angular/common';
import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-admin-porte-folio',
  templateUrl: './admin-porte-folio.component.html',
  styleUrls: ['./admin-porte-folio.component.less']
})
export class AdminPorteFolioComponent extends BaseComponent implements OnInit {

  currentSlide: number = 0;
  experiences: Array<Experience> = [];
  displayBloc: boolean[] = [];
  formsExperiences: FormGroup[] = [];
  showDeleteExperience: boolean = false;
  textDelete: string;
  expoerienceToDelete: Experience;
  skillsCategory: SkillCategory[] = [];
  constructor(private experienceService: ExperienceService, private _fb: FormBuilder, private skillService: SkillService, private pipeDate: DatePipe) {
    super();
  }

  ngOnInit(): void {
    this.experienceService.getAll().then((res) => {

      res.forEach((experience) => {
        let form = this.buildForm(experience);
        form.markAsUntouched();
        form.markAsPristine();

        this.formsExperiences.push(form);
      });

      this.experiences = res;
    });

    this.skillService.getAllSkillDetail().then((res) => { this.skillsCategory = res; });

    UserService.subCurrentUser.subscribe(() => {
      this.formsExperiences.forEach((form) => {
        for (var key in form.controls) {
          if (this.canEdit) {
            form.controls[key].enable();
          } else {
            form.controls[key].disable();
          }
        }
      })
    });
  }


  buildForm(item: Experience) {
    return this._fb.group({
      experienceId: [item.experienceId],
      name: [{ value: item.name, disabled: !this.canEdit }, Validators.required],
      start: [{ value: item.start ? new Date(item.start.toString()).toLocaleDateString() : null, disabled: !this.canEdit }, Validators.required],
      end: [{ value: item.end ? new Date(item.end.toString()).toLocaleDateString() : null, disabled: !this.canEdit }],
      description: [{ value: item.description, disabled: !this.canEdit }, Validators.required]
    });
  }

  display(bloc: number) {
    this.displayBloc[bloc] = true;
  }
  hide(bloc: number) {
    this.displayBloc[bloc] = false;
  }

  onSubmit(form: FormGroup, skills: SkillCategoryDetail[]) {
   
    if (form.valid) {
      let item = form.value as Experience;

      item.SkillCategoryDetails = skills;

      item.end = item.end ? new Date(this.pipeDate.transform(item.end + ' 12:00:00', null, '+0000', 'fr-FR')) : null;
      item.start = new Date(Date.parse(item.start + ' 12:00:00'));

      this.experienceService.save(item);
    }

  }

  isValidField(form: FormGroup, field: string) {
    if (!(form.get(field).dirty || form.get(field).touched)) {
      return true;
    }
    return form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  addExperience() {
    this.experiences.unshift(new Experience());
    this.formsExperiences.unshift(this.buildForm(new Experience()));
  }

  deleteExperience(experience: Experience, index: number) {
    if (experience.experienceId) {
      this.expoerienceToDelete = experience;
      this.textDelete = experience.name;
      this.showDeleteExperience = true;
    } else {
      this.experiences.splice(index, 1);
      this.formsExperiences.splice(index, 1);
    }
  }

  addSkillExperience(skillCategoryDetails: SkillCategoryDetail[]) {
    skillCategoryDetails.unshift(new SkillCategoryDetail());
  }

  async deleteSkill(experienceSkills: SkillCategoryDetail[], index: number) {
    if (experienceSkills[index].experienceId && experienceSkills[index].skillCategoryDetailId) {
      await this.experienceService.deleteSkill(experienceSkills[index].experienceId, experienceSkills[index].skillCategoryDetailId).then((res) => {
        if (res) {
          experienceSkills.splice(index, 1);
        }
      });
    } else {
      experienceSkills.splice(index, 1);
    }
  }

  validateDelete = async () => {
    await this.experienceService.deleteExperience(this.expoerienceToDelete.experienceId).then(() => {
    });
  }

  skillChosen(skillCategoryDetails: SkillCategoryDetail[], item: SkillCategoryDetail, experienceId: number) {
    item.experienceId = experienceId;
    skillCategoryDetails.unshift(item);
    console.log(item);
  }
}
