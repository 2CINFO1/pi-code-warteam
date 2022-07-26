import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task';
import Swal from 'sweetalert2';

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
  doing: Task[] = []
  role = localStorage.getItem('role')

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.readProject()
  }

  readProject () {
    this.projectService.readProject(this.projectId).subscribe((response: any) => {
      this.project = new Project(response)
      this.todo = this.project.tasks.filter((task: Task) => task.etat == 'pending')
      this.doing = this.project.tasks.filter((task: Task) => task.etat == 'progress')
      this.done = this.project.tasks.filter((task: Task) => task.etat == 'done')
    })
  }

  drop(event: CdkDragDrop<string[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );      
    }
  }

  closeProject() {
    Swal.fire({
      title: 'Are you sure to enclose this project?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {

      if (result.value) {
        this.projectService.changeEtatProject(this.projectId, 'enclosed').subscribe((response: any) => {
          
        })
        Swal.fire('Success!', 'Project has been Closed.', 'success');
        this.router.navigate(['/projects'])
      }
    });
  }
}
