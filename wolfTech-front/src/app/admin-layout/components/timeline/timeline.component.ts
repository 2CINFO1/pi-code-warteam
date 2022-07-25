import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  project: Project;
  projectId = this.activatedRoute.snapshot.paramMap.get('id');
  todo: Task[] = []
  done: Task[] = []

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readProject()
  }

  readProject () {
    this.projectService.readProject(this.projectId).subscribe((response: any) => {
      this.project = new Project(response)
      this.todo = this.project.tasks.filter((task: Task) => task.etat == 'En cours')
      this.done = this.project.tasks.filter((task: Task) => task.etat == 'ytes')  
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);      
    } else {
      console.log(event);
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('test');
      
    }
  }
}
