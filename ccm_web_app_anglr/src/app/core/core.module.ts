import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { LogService } from "./services/log/log.service";
import { AuthService } from "./services/auth/auth.service";
import { HttpService } from "./services/base/http.service";
import { RoutingInfoService } from "./services/routInfo/route.info.service";
import { UIService } from "./services/ui/ui.service";
import { WizardService } from './services/ui/wizard.service';
import { GeoLocationService } from "./services/location/geo-location.service";

import { SetupService } from "./services/setup/setup.service";
import { DashboardService } from "./services/dashboard/dashboard.service";
import { DoctorScheduleService } from "./services/doctor/doctor.schedule.service";
import { ScheduleService } from "./services/schedule/schedule.service";
import { FileService } from "./services/file/file.service";
import { FormService } from "./services/form/form.service";

import { UtilityService } from "./services/general/utility.service";
import { MappingService } from "./services/mapping/mapping.service";

import { UserService } from './services/user/user.service'
import { LoginGuard } from './services/guard/login.guard';

@NgModule({
    imports: [HttpModule],
    providers: [
        { provide: 'ILogService', useClass: LogService },
        { provide: 'IAuthService', useClass: AuthService },
        DatePipe,
        UIService, WizardService, HttpService,
        RoutingInfoService, GeoLocationService,
        SetupService, DashboardService,
        ScheduleService,
        DoctorScheduleService,
        FileService,
        UtilityService,
        MappingService,
        UserService, FormService,
        LoginGuard
    ],
    declarations: [],
    exports: []
})
export class CoreModule { }