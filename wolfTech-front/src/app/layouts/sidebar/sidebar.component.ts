import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string[]
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', role: ['ceo', 'manager'] },
    { path: '/demandes', title: 'Demandes',  icon: 'ni-tv-2 text-primary', class: '', role: ['ceo', 'manager'] },
    { path: '/comments', title: 'Comments',  icon:'ni ni-palette text-orange', class: '', role: ['client'] },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', role: ['client'] },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', role: ['client', 'manager'] },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', role: [] },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', role: [] },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '', role: [] },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', role: [] }
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

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  existRole (roles: string[]) {
    let _role = roles.find((role: string) => role == this.role)    
    if (_role) {
      return true;
    }
    return false;
  }
}
