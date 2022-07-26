import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', role: ['ceo', 'manager'] },
    { path: '/demandes', title: 'Demandes',  icon: 'ni ni-spaceship text-orange', class: '', role: ['ceo', 'manager'] },
    { path: '/create-demande', title: 'Create Demande',  icon: 'ni-tv-2 text-orange', class: '', role: ['client'] },
    { path: '/projects', title: 'Projects',  icon:'ni ni-palette text-orange', class: '', role: ['ceo', 'manager', 'consultant'] },
    { path: '/comments', title: 'Comments',  icon:'ni ni-palette text-orange', class: '', role: ['ceo', 'manager', 'client', 'consultant'] },
    { path: '/leave-request', title: 'Leave request',  icon: 'ni ni-palette text-orange', class: '', role: ['consultant'] },
    { path: '/leave-list', title: 'Leave list',  icon: 'ni ni-align-left-2', class: '', role: ['ceo', 'manager'] },
    { path: '/my-leaves', title: 'My Leaves',  icon:'ni ni-ui-04', class: '', role: ['consultant', 'manager'] },
    { path: '/primes', title: 'Primes',  icon:'ni ni-diamond', class: '', role: ['consultant', 'manager'] },
    { path: '/invite-user', title: 'Invite User',  icon:'ni ni-palette text-orange', class: '', role: ['ceo', 'manager'] },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', role: ['client'] },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', role: ['client', 'manager'] },

    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', role: ['ceo', 'client', 'manager', 'consultant'] },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', role: ['manager'] }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  role = localStorage.getItem('role')
  user$: Observable<User> = this.userService.getUser(localStorage.getItem('userId')).pipe(map((data) => new User(data)))

  constructor(private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  existRole (roles: string[]) {
    const _role = roles.find((role: string) => role === this.role);
    if (_role) {
      return true;
    }
    return false;
  }

}
