import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { Task } from 'src/app/core/models/task';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = []
  role = localStorage.getItem('role')

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.readProjects()
  }

  readProjects () {
    this.projectService.readProjects().subscribe((response: any) => {
      response.map(project =>  {
        project = new Project(project)
        this.projects.push(project)
      })
      
 
      console.log(this.projects);
      
    })
  }

  navigateToProjectDetails (projectId) {
    this.router.navigate(['project-details', projectId])
  }

}
