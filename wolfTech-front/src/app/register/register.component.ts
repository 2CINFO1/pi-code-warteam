import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        image: ['',[Validators.required]]
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }


    let formData = new FormData();
    formData.append('file', this.registerForm.get('image').value)
    formData.append('first_name', this.registerForm.get('first_name').value)
    formData.append('last_name', this.registerForm.get('last_name').value)
    formData.append('email', this.registerForm.get('email').value)
    formData.append('password', this.registerForm.get('password').value)
    formData.append('role', 'client')

    this.userService.register(formData).subscribe((response: any) => {
      this.registerForm.reset()
      this.router.navigate(['/login'])
    })
  }
}
