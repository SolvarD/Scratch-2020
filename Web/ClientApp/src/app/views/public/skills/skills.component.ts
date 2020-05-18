import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { SkillCategory } from '../../../../models/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.less']
})
export class SkillsComponent implements OnInit {

  skillsCategory: SkillCategory[] = [];
  constructor(private skillService: SkillService) { }


  ngOnInit(): void {
    this.skillService.getAll().then((res) => { this.skillsCategory = res; });

    //this.skills = {
    //  'LANGUAGE': ['Angular 8', 'c# 4.5', 'ASP MVC5 // SignalR', '.NET core 2.1 ~ 3', 'HTML5', 'AngularJs', 'JQuery'],
    //  'DATABASE': ['SQL2016', 'SQL2012', 'SQL2008'],
    //  'ORM': ['Dapper', 'EntityFramework', 'nHibernate'],
    //  'UNIT_TEST': ['nUnit', 'MSTest', 'Karma/Jasmine', 'Selenium'],
    //  'TOOLS': ['Visual Studio 2019', 'Visual Studio Code', 'SQL Server Mnagement Studio', 'Balsamiq', 'Jira'],
    //  'REPOSITORY': ['Azure DevOps', 'Github', 'TFS']
    //};
  }
}
