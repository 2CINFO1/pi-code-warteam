import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from 'src/app/core/services/leave-request.service';
import { LeaveModel } from 'src/app/shared/model/congeModel';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css']
})
export class MyLeavesComponent implements OnInit {

  leaves: LeaveModel[] = [];
  role = localStorage.getItem('role');
  stats: any;

  constructor(
    private leaveService: LeaveRequestService
  ) { }

  ngOnInit(): void {
    this.readMyLeaves();
    this.readStats();
  }

  readMyLeaves () {
    this.leaveService.readMyLeaveRequests().subscribe((response: any) => {
      response.map(conge => {
        conge = new LeaveModel(conge);
        this.leaves.push(conge);
      });
    });
  }

  readStats () {
    this.leaveService.readStats().subscribe((response: any) => {
      this.stats = response;
      console.log(this.stats);

    });
  }
}
