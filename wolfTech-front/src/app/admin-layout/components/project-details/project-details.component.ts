import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/core/models/project';
import { Task } from 'src/app/core/models/task';
import { User } from 'src/app/core/models/user';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  task: Task
  projectId = this.activatedRoute.snapshot.paramMap.get('id');
  closeResult = '';
  taskForm: FormGroup
  submitted = false
  role = localStorage.getItem('role')
  consultants: User[] = []
  affectConsultantForm: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.projectDetails(this.projectId)
    this.readConsultants()
    this.taskForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.affectConsultantForm = this.formBuilder.group({
      consultant: ['', Validators.required]
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  projectDetails (projectId) {
    this.projectService.readProject(projectId).subscribe((response: any) => {
      this.project = new Project(response)
    })
  }

  readConsultants () {
    this.userService.displayUserByRole({ role: 'consultant'}).subscribe((response: any) => {
      response.user.map(user => {
        user = new User(user)
        this.consultants.push(user)
      })
    })
  }

  get f() { return this.taskForm.controls; }

  addTask () {
    this.submitted = true;

    if (this.taskForm.invalid) {
        return;
    }

    let body = {
      Nom: this.taskForm.value.nom,
      Description: this.taskForm.value.description,
      Projet: this.projectId
    }

    this.projectService.createTask(body).subscribe((response: any) => {
      let task = new Task(response)
      this.submitted = false;
      this.taskForm.reset()
      this.project.tasks.unshift(task)
      this.modalService.dismissAll()
    })

  }

  saveTask(task) {
    this.task = task
  }

  public existTask = false;
  addTaskToConsultant () {
    let body = {
      userId: this.affectConsultantForm.value.consultant
    }

    this.projectService.addTaskToConsultant(this.task.id, body).subscribe((response: any) => {
      this.submitted = false;
      this.affectConsultantForm.reset()
      this.modalService.dismissAll()
      this.projectDetails(this.projectId)
    }, err => {
      this.existTask = true
    })
  }
}
