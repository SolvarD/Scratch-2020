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
  editExperiences: boolean[] = [];

  formsExperiences: FormGroup[] = [];
  showDeleteExperience: boolean = false;
  textDelete: string;
  experienceToDelete: Experience;
  skillsCategory: SkillCategoryDetail[] = [];
  allSkillByExperience: Array<any> = [];

  skillByExperienceToRemove: Array<any[]> = [];

  constructor(private experienceService: ExperienceService, private _fb: FormBuilder, private skillService: SkillService) {
    super();
  }

  async ngOnInit() {

    this.skillsCategory = await this.skillService.getAllSkillDetail();
    this.experiences = await this.experienceService.getAll();
    this.experiences.forEach((experience) => {
      let form = this.buildForm(experience);
      form.markAsUntouched();
      form.markAsPristine();

      this.formsExperiences.push(form);

      let copySkills = JSON.parse(JSON.stringify(this.skillsCategory));
      let experienceId = experience.experienceId;

      copySkills.forEach((skill) => {
        let checked = experience.skillCategoryDetails.filter(g => g.skillCategoryDetailId == skill.skillCategoryDetailId).length > 0;
        skill.checked = checked;
        skill.isNew = !checked;
        skill.experienceId = experienceId;
      });

      this.allSkillByExperience.push(copySkills);
    });

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
      start: [{ value: item.start ? new Date(item.start.toString()): null, disabled: !this.canEdit }, Validators.required],
      end: [{ value: item.end ? new Date(item.end.toString()) : null, disabled: !this.canEdit }],
      description: [{ value: item.description, disabled: !this.canEdit }, Validators.required]
    }, { updateOn: 'blur' });
  }

  display(bloc: number) {
    this.displayBloc[bloc] = true;
  }
  hide(bloc: number) {
    this.displayBloc[bloc] = false;
  }

  edit(bloc: number) {
    this.editExperiences[bloc] = true;
  }
  showExperiences(bloc: number) {
    this.editExperiences[bloc] = false;
  }

  async onSubmit(form: FormGroup, skills: SkillCategoryDetail[], indexExperience: number) {

    if (form.valid) {
      let item = form.value as Experience;

      item.skillCategoryDetails = skills;

      if (this.skillByExperienceToRemove[indexExperience] && this.skillByExperienceToRemove[indexExperience].length) {
        await this.experienceService.unlinkManySkillExperience(this.skillByExperienceToRemove[indexExperience]);
      }

      this.experienceService.save(item).then((res) => {
        this.experiences[indexExperience] = res;
        this.formsExperiences[indexExperience] = this.buildForm(res);
      });
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

    let copySkills = JSON.parse(JSON.stringify(this.skillsCategory));
    this.allSkillByExperience.unshift(copySkills);
  }

  deleteExperience(experience: Experience, index: number) {
    if (experience.experienceId) {
      this.experienceToDelete = experience;
      this.textDelete = experience.name;
      this.showDeleteExperience = true;
    } else {
      this.experiences.splice(index, 1);
      this.formsExperiences.splice(index, 1);
    }
  }

  validateDelete = () => {
     this.experienceService.deleteExperience(this.experienceToDelete.experienceId)
      .then((res) => {
        if (res) {

        }
      });
  }

  checkSkill(item, indexExperience: number, indexSkill: number) {
    let currentSkillExperience = this.allSkillByExperience[indexExperience].filter(g => g.skillCategoryDetailId == item.skillCategoryDetailId)[0]

    currentSkillExperience.checked = !currentSkillExperience.checked;

    //save
    if (currentSkillExperience.checked) {
      this.experiences[indexExperience].skillCategoryDetails.unshift(item);
      if (!item.isNew) {
        let itemToRemove = this.skillByExperienceToRemove[indexExperience].filter(g => g.skillCategoryDetailId == item.skillCategoryDetailId)[0];
        this.skillByExperienceToRemove[indexExperience].splice(this.skillByExperienceToRemove[indexExperience].indexOf(itemToRemove), 1)
      }
    } else {
      let itemToRemove = this.experiences[indexExperience].skillCategoryDetails.filter(g => g.skillCategoryDetailId == item.skillCategoryDetailId)[0];
      this.experiences[indexExperience].skillCategoryDetails.splice(this.experiences[indexExperience].skillCategoryDetails.indexOf(itemToRemove), 1);
      if (!item.isNew) {
        if (!this.skillByExperienceToRemove[indexExperience]) { this.skillByExperienceToRemove[indexExperience] = []; }
        this.skillByExperienceToRemove[indexExperience].push(item);
      }
    }
  }
}
