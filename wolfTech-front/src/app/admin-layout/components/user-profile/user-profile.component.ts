import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user : User;
  public formData = new FormData();
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
   
    this.userService.getUser(localStorage.getItem('userId')).subscribe((response: any) => { //200
      console.log(response);
      this.user = new User(response)

    }, err => {
          
    })
    this.registerForm = this.formBuilder.group({
      first_name: [],
      last_name: [],      
      image: []
  })
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    

    this.submitted = true;

    if (this.registerForm.invalid) {
      
        return;
    }


    let formData = new FormData();
    formData.append('first_name', this.registerForm.get('first_name').value)
    formData.append('last_name', this.registerForm.get('last_name').value)
    formData.append('file', this.formData.get('file'))

    this.userService.updateUser(formData,localStorage.getItem('userId')).subscribe((response: any) => {
      this.registerForm.reset()
    })
  }
  
  uploadFiles( file ) {
    console.log( 'file', file )
    for ( let i = 0; i < file.length; i++ ) {
        this.formData.append( "file", file[i], file[i]['name'] );
    }
  }
}

 
    
  


