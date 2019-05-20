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
import { PatientRecordService } from "./services/patient/patient.record.service";
import { ScheduleService } from "./services/schedule/schedule.service";
import { AppointmentService } from "./services/schedule/appointment.service";
import { FileService } from "./services/file/file.service";
import { FormService } from "./services/form/form.service";

import { UtilityService } from "./services/general/utility.service";
import { ForumService } from "./services/forum/forum.service";
import { TicketService } from "./services/ticket/ticket.service";
import { CcmPlanService } from "./services/ccm.plan/ccm.plan.service";
import { ReportService } from "./services/report/report.service";
import { MappingService } from "./services/mapping/mapping.service";
import { ExcelService } from './services/general/excel.service';

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
        AppointmentService,
        DoctorScheduleService,
        PatientRecordService,
        FileService,
        UtilityService,
        ForumService,
        TicketService,
        CcmPlanService,
        ReportService,
        MappingService,
        ExcelService,
        UserService, FormService,
        LoginGuard
    ],
    declarations: [],
    exports: []
})
export class CoreModule { }