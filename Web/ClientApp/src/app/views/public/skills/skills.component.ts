import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.less']
})
export class SkillsComponent implements OnInit {
  currentSlide: number = 0;

  skills: any;
  objectKeys = Object.keys;

  ngOnInit(): void {
    this.skills = {
      'LANGUAGE': ['Angular 8', 'c# 4.5', 'ASP MVC5 // SignalR', '.NET core 2.1 ~ 3', 'HTML5', 'AngularJs', 'JQuery'],
      'DATABASE': ['SQL2016', 'SQL2012', 'SQL2008'],
      'ORM': ['Dapper', 'EntityFramework', 'nHibernate'],
      'UNIT_TEST': ['nUnit', 'MSTest', 'Karma/Jasmine', 'Selenium'],
      'TOOLS': ['Visual Studio 2019', 'Visual Studio Code', 'SQL Server Mnagement Studio', 'Balsamiq', 'Jira'],
      'REPOSITORY': ['Azure DevOps', 'Github', 'TFS']
    };
  }
}
