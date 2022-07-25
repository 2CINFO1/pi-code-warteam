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
  userId = localStorage.getItem('userId')

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
      if (this.role == 'consultant') {
        let taskByConsultant: Project[] = []
        for (const project of this.projects) {
          let tasks = project.tasks.find((task: Task) => task.consultant && task.consultant.id == this.userId )
          if (tasks) {
            taskByConsultant.push(project)
          }
        }
        this.projects = taskByConsultant
      }
    })
  }

  navigateToProjectDetails (projectId) {
    this.router.navigate(['project-details', projectId])
  }

}
