import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { SkillCategory, SkillCategoryDetail } from '../../../../models/skill';
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

      console.log(this.formCategories);
    });
  }

  isValidField(form: FormGroup, field: string) {
    if (!(form.get(field).dirty || form.get(field).touched)) {
      return true;
    }
    return form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  buildForm = (category: SkillCategory) => {
    return this._fb.group({
      skillCategoryId: [category.skillCategoryId],
      label: [{ value: category.label, disabled: !this.canEdit }, Validators.required],
      //skillCategoryDetails: category.skillCategoryDetails.map((item) => {
      //  return this._fb.group({
      //    skillCategoryDetailId: [item.skillCategoryDetailId],
      //    label: [{ value: item.label, disabled: !this.canEdit }, Validators.required]
      //  });
      //})
    });
  }

  addCategory() {
    this.formCategories.unshift(this.buildForm(new SkillCategory()));
    this.skillsCategory.unshift(new SkillCategory());
  }

  saveCategory(category: FormGroup) {
    console.log(category.value);
  }

  deleteCategory(index: number) {
    let selectedCategory = this.skillsCategory[index];

    if (selectedCategory.skillCategoryId) {

    } else {
      this.skillsCategory.splice(index, 1);
      this.formCategories.splice(index, 1);
    }
  }

  addSkill(scd: SkillCategoryDetail[]) {
    scd.push(new SkillCategoryDetail());
  }

  deleteSkill(scd: SkillCategoryDetail[], index: number) {
    let selectedSkill = scd[index];

    if (selectedSkill.skillCategoryDetailId) {

    } else {
      scd.splice(index, 1);
    }

  }
}
