import { Routes } from '@angular/router';
import { AddDemandeComponent } from './components/add-demande/add-demande.component';
import { CommentsComponent } from './components/comments/comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { IconsComponent } from './components/icons/icons.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveListComponent } from './components/leave-list/leave-list.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
import { MapsComponent } from './components/maps/maps.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TablesComponent } from './components/tables/tables.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { PrimeComponent } from './components/prime/prime.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'comments',           component: CommentsComponent },
    { path: 'leave-request', component: LeaveRequestComponent},
    { path: 'leave-list', component: LeaveListComponent},
    { path: 'projects',             component: ProjectsComponent},
    { path: 'project-details/:id',  component: ProjectDetailsComponent},
    { path: 'timeline-project/:id', component: TimelineComponent},
    { path: 'demandes',             component: DemandesComponent},
    { path: 'demande-details/:id',  component: DemandeDetailsComponent},
    { path: 'create-demande',       component: AddDemandeComponent},
    { path: 'invite-user', component: InviteUserComponent},
    { path: 'my-leaves', component: MyLeavesComponent},
    { path: 'primes', component: PrimeComponent},

];
