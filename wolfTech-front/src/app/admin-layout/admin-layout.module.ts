import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablesComponent } from './components/tables/tables.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveListComponent } from './components/leave-list/leave-list.component';

import { ProjectsComponent } from './components/projects/projects.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';
// import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddDemandeComponent } from './components/add-demande/add-demande.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    NgSelectModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CommentsComponent,
    LeaveRequestComponent,
    LeaveListComponent,
    ProjectsComponent,
    DemandesComponent,
    DemandeDetailsComponent,
    ProjectDetailsComponent,
    AddDemandeComponent,
    InviteUserComponent,
    TimelineComponent,
    LeaveBalanceComponent,
    MyLeavesComponent
  ]
})

export class AdminLayoutModule {}
