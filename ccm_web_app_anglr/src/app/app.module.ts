import { APP_BASE_HREF } from '@angular/common';

import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
// import { MatIconModule } from "@angular/material/icon";



import { AppComponent } from './app.component';

// import { MainModule } from './main/main.module';
// import { UploadModule } from './upload-media/upload.module';

// import { WelcomeComponent } from './test/welcome.component';
// import { NotFoundComponent } from './others/not-found.component';
// import { PermissionDeniedComponent } from './others/permission.denied.component';

import { CanActivateViaAuthGuard } from './core/security/auth.guard';
import { CanActivateViaMainGuard } from './core/security/main.page.gurad';

import { SharedModule } from './shared/shared.module';
// import { ScheduleModule } from './schedule/schedule.module';
import { SchedulerModule } from './scheduler/scheduler.module';


// import { BlockCopyPasteDirective } from './shared/directives/blockCopyPaste.directive';


@NgModule({
  declarations: [
    AppComponent,

    // WelcomeComponent,
    // NotFoundComponent,
    // PermissionDeniedComponent,
    // MessageDialogComponent,

  ],
  imports: [
    // MainModule,
    // AngularFontAwesomeModule,


    
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,

    SharedModule,

    MaterialModule,
    // MatIconModule,
    // ScheduleModule,
    SchedulerModule,
    CoreModule,
    AppRoutingModule,
    // UploadModule, ChartsModule

  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/' + (environment.webAppUrl || '')
    },
    CanActivateViaAuthGuard,
    CanActivateViaMainGuard
  ],
  entryComponents: [
    // MessageDialogComponent,
  ],
  bootstrap: [AppComponent,]


})
export class AppModule { }
