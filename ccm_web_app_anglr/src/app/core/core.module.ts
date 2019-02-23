import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LogService } from "./services/log/log.service";
import { AuthService } from "./services/auth/auth.service";
import { HttpService } from "./services/base/http.service";
import { RoutingInfoService } from "./services/routInfo/route.info.service";
import { UIService } from "./services/ui/ui.service";
import { WizardService } from './services/ui/wizard.service';
import { GeoLocationService } from "./services/location/geo-location.service";

import { SetupService } from "./services/setup/setup.service";
import { FileService } from "./services/file/file.service";
import { FormService } from "./services/form/form.service";

import { UtilityService } from "./services/general/utility.service";

import { UserService } from './services/user/user.service'
import { LoginGuard } from './services/guard/login.guard';

@NgModule({
    imports: [HttpModule],
    providers: [{ provide: 'ILogService', useClass: LogService },
    { provide: 'IAuthService', useClass: AuthService },
        UIService, WizardService, HttpService,
        RoutingInfoService, GeoLocationService,
        SetupService,
        FileService,
        UtilityService, UserService, FormService,
        LoginGuard],
    declarations: [],
    exports: []
})
export class CoreModule { }