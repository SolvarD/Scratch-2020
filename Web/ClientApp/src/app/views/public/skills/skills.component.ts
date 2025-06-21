import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { SkillCategory } from '../../../../models/skill';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.less'],
    standalone: true
})
export class SkillsComponent implements OnInit {

  skillsCategory: SkillCategory[] = [];
  constructor(private skillService: SkillService) { }


  ngOnInit(): void {
    this.skillService.getAll().then((res) => { this.skillsCategory = res.data; });
  }
}
