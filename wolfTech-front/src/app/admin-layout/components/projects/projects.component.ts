import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = []
  constructor(
    private projectService: ProjectService    
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

}
