import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  user$: Observable<User> = this.userService.getUser(localStorage.getItem('userId')).pipe(map((data) => new User(data)))

  constructor(
    location: Location,  
    private element: ElementRef, 
    private router: Router,
    private userService: UserService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  
  

  logout() {
    this.userService.logout()
    this.router.navigate(['/login'])
  }

}
