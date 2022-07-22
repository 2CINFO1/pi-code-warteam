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
}
