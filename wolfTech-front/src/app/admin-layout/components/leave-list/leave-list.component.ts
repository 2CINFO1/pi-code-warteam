
  import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from 'src/app/core/services/leave-request.service';
import { LeaveModel } from 'src/app/shared/model/congeModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css'],
})
export class LeaveListComponent implements OnInit {
  leaves: LeaveModel[] = [];
  role = localStorage.getItem('role');
  leaveRequestService: any;
  leave: LeaveModel;
  stats: any;

  constructor(private service: LeaveRequestService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getAllLeaves();
    this.readAllStats()
  }

  delete(id ) {

    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      console.log(id);

    this.service.deleteLeave(id).subscribe((response: any) => {
      this.leaves = [];
      this.getAllLeaves();

      this.router.navigate(['/leave-list']);
      console.log(id);
        });
        Swal.fire('Success!', 'Leave has been Deleted.', 'success');

      });
    }






  getAllLeaves() {
    this.service.getAllLeave().subscribe((data) => {
      data.map(leave => {
        leave = new LeaveModel(leave)
        this.leaves.push(leave)
      })
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
          this.leaves = []
          this.getAllLeaves();
          this.readAllStats()
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
          this.leaves = []
          this.getAllLeaves();
          this.readAllStats()
        });
        Swal.fire('Success!', 'Leave has been denied.', 'success');
      }
    });
  }




  onView(item: LeaveModel) {
    Swal.fire({

      title: 'User detail',
      imageUrl: item.user.image,
      imageWidth: 90,
      imageHeight: 90,
      html: '<p align="left"> User: ' + item.user.first_name + ' ' + item.user.last_name + '</p>' + '<br>'
      + '<p align="left"> Email: ' + item.user.email + '</p>'+ '<br>',

    });
  }


  readAllStats () {
    this.service.readAllStats().subscribe((response: any) => {
      this.stats = response;
      console.log(this.stats);

    });
  }

}
