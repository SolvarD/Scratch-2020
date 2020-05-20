import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { SkillCategory } from '../../../../models/skill';
import { BaseComponent } from '../../../../models/base-component';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.less']
})
export class AdminSkillsComponent extends BaseComponent implements OnInit {

  skillsCategory: SkillCategory[] = [];
  constructor(private skillService: SkillService) { super(); }


  ngOnInit(): void {
    this.skillService.getAll().then((res) => { this.skillsCategory = res; });
  }
}
