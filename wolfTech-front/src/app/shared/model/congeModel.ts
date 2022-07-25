import { UserModel } from './userModel';

export class LeaveModel {
  id: string;
  leave_subject: String;
  leave_reason: String;
  start_date: Date;
  end_date: Date;
  days: Number;
  status: string;
  approved: boolean;
  denied: boolean;
  user: UserModel;
  constructor (data) {
    console.log(data);

    this.id = data._id;
    this.leave_subject = data.leave_subject;
    this.leave_reason = data.leave_reason;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.days = data.days;
    this.status = data.status;
    this.approved = data.approved;
    this.denied = data.denied;
    this.user = data.user;
  }
}

