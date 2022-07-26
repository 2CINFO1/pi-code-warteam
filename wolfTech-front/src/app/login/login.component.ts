import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() { return this.loginForm.controls; }
  blocketUser;
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    this.userService.login(this.loginForm.value).subscribe((response: any) => { //200
      console.log(response);
      this.submitted = false;
      this.loginForm.reset()
      localStorage.setItem('role', response.role.name)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response._id)
      this.router.navigate(['/dashboard'])
    }, err => {
      Swal.fire({
        title: err.error,
        text: '',
        icon: 'error',
        confirmButtonColor: '#FF0000'
      }).then((result) => {
        if (result.value) {
      
        }
      })
    })
  }

}
