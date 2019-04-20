import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/security/auth.guard';
import { CanActivateViaMainGuard } from './core/security/main.page.gurad';

// import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
// import { ResendVerificationComponent } from './auth/verfication/resend-verification.component';
import { VerificationComponent } from './auth/verfication/verification.component';
import { PermissionDeniedComponent } from './others/permission.denied.component';
import { NotFoundComponent } from './others/not-found.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/forgot-password/reset-password.component';
// import { SchedulerComponent } from './scheduler/scheduler.component';
// import { ScheduleComponent } from './Schedule/schedule.component';
// import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
// import { ResetPasswordComponent } from './auth/forgot-password/reset-password.component';


// import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  // {
  //   path: 'resend-verification',
  //   component: ResendVerificationComponent,
  //   canActivate: [CanActivateViaMainGuard],
  //   children: []
  // },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    // pathMatch: 'full',
    // component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'um',
    loadChildren: './user.management/user.management.module#UserManagementModule',
    // pathMatch: 'full',
    // component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'rm',
    loadChildren: './role.management/role.management.module#RoleManagementModule',
    // pathMatch: 'full',
    // component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#ScheduleModule',
    // pathMatch: 'full',
    // component: SchedulerComponent,
    // component: ScheduleComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'appointment',
    loadChildren: './appointment/appointment.module#AppointmentModule',
    // pathMatch: 'full',
    // component: SchedulerComponent,
    // component: ScheduleComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'forum',
    loadChildren: './forum/forum.module#ForumModule',
    // pathMatch: 'full',
    // component: SchedulerComponent,
    // component: ScheduleComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'ticket',
    loadChildren: './ticket.management/ticket.management.module#TicketManagementModule',
    // pathMatch: 'full',
    // component: SchedulerComponent,
    // component: ScheduleComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'patient',
    loadChildren: './patient.record/patient.record.module#PatientRecordModule',
    // pathMatch: 'full',
    // component: SchedulerComponent,
    // component: ScheduleComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'ccm',
    loadChildren: './ccm.plan/ccm.plan.module#CcmPlanModule',
    // pathMatch: 'full',
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'file/upload',
    loadChildren: './file.management/file.management.module#FileManagementModule',
    // pathMatch: 'full',
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  // {
  //   path: 'user',
  //   loadChildren: './user/user.module#UserModule',
  //   canActivate: [CanActivateViaAuthGuard],
  //   // children: []
  // },
  {
    path: 'error',
    component: NotFoundComponent,
    // canActivate: [CanActivateViaAuthGuard],
    children: []
  },
  {
    path: 'permission',
    component: PermissionDeniedComponent,
    // canActivate: [CanActivateViaAuthGuard],
    children: []
  },
  // {
  //   path: 'logout',
  //   component: LogoutComponent,
  //   children: []
  // },
  // { path: 'welcome', component: WelcomeComponent },
  // { path: 'welcome', redirectTo: '', pathMatch: 'full' },
  // { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
