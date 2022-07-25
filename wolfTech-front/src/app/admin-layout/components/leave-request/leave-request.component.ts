import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveRequestService } from 'src/app/core/services/leave-request.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
  private leaveRequestService: LeaveRequestService,
    private router: Router
  ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        leave_subject: ['', Validators.required],
          leave_reason: ['', [Validators.required]],
          start_date: ['', [Validators.required]],
          end_date: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      let body = {
        ...this.registerForm.value,
          status : 'pending'
      };

      this.leaveRequestService.createLeaveRequest(body).subscribe((response: any) => {
        this.router.navigate(['/leave-list']);
      });
}

}






