import { Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TablesComponent } from './components/tables/tables.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'comments',           component: CommentsComponent },
    { path: 'projects', component: ProjectsComponent},
    { path: 'demandes', component: DemandesComponent},
    { path: 'demande-details/:id', component: DemandeDetailsComponent}
];
