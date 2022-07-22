import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from 'src/app/core/services/leave-request.service';
import { LeaveModel } from 'src/app/shared/model/congeModel';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css'],
})
export class LeaveListComponent implements OnInit {
  leaves: LeaveModel[];
  role = localStorage.getItem('role')

  constructor(private service: LeaveRequestService) {}

  ngOnInit(): void {
    this.getAllLeaves();
    console.log(this.role);

  }

  getAllLeaves() {
    this.service.getAllLeave().subscribe((data) => {
      this.leaves = data;
    });
  }
  approve(item: LeaveModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.value) {
        item.status = 'approved';
        item.approved = true;
        item.denied = false;
        this.service.updateStatus(item).subscribe((data) => {
          this.getAllLeaves();
        });
        Swal.fire('Success!', 'Leave has been Approved.', 'success');
      }
    });
  }
  deny(item: LeaveModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deny it!',
    }).then((result) => {
      if (result.value) {
        item.denied = true;
        item.approved = false;
        item.status = 'denied';
        this.service.updateStatus(item).subscribe((data) => {
          this.getAllLeaves();
        });
        Swal.fire('Success!', 'Leave has been denied.', 'success');
      }
    });
  }

  onView(item: LeaveModel) {
    Swal.fire({
      icon: 'info',
      title: 'Leave detail',
      text: 'user ' + item.user.first_name,
      footer: '',
    });
  }
}
