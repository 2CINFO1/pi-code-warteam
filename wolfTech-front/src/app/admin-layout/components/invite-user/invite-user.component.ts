import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;
  searchUser : string;
  dyn : string;
  users : User[] = []
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
  })


  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    let body = {
      ...this.registerForm.value

    }

    this.userService.register(body).subscribe((response: any) => {
      this.registerForm.reset()
      this.submitted = false;
      this.router.navigate(['/invite-user'])
    })
  }
  displayfiltre(){
    this.users=[];
    this.userService.display({ role: this.searchUser}).subscribe((response: any) => {
      response.user.map(user => {
        user = new User(user)
        this.users.push(user)
      })
      this.affect();
    })
  }
  affect(){
    this.dyn=this.searchUser;
  }
  block(id:string){
     this.userService.block({userId:id}).subscribe((Response:any) =>{
       Response.user.map(user => {
        user = new User(user)
        
        this.users.push(user)
       })
       console.log(this.users)
      
     })
  }
}


