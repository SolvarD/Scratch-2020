import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { SkillCategory } from '../../../../models/skill';
import { BaseComponent } from '../../../../models/base-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.less']
})
export class AdminSkillsComponent extends BaseComponent implements OnInit {

  skillsCategory: SkillCategory[] = [];
  formCategories: FormGroup[] = [];

  constructor(private skillService: SkillService, private _fb: FormBuilder) { super(); }


  ngOnInit(): void {
    this.skillService.getAll().then((res) => {
      this.skillsCategory = res;
      res.forEach((category: SkillCategory) => {
        this.formCategories.push(this.buildForm(category));
      });
    });
  }

  addSkill() {

  }

  isValidField() {
    return true;
  }

  buildForm(category: SkillCategory) {
    return this._fb.group({
      label: [{ value: category.Label }, Validators.required]
    });
  }
}
