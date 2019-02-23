import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MaterialModule } from "../material/material.module";

import { AuthHeader } from "./header/auth-header.component";
import { AuthFooter } from "./footer/auth-footer.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { VerificationComponent } from "./verfication/verification.component";
import { AuthService } from '../core/services/auth/auth.service';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [RouterModule, ReactiveFormsModule, FormsModule, MaterialModule, SharedModule],
    declarations: [
        AuthHeader,
        AuthFooter,
        LoginComponent,
        RegistrationComponent,
        VerificationComponent,
    ],
    providers: [AuthService]
})
export class AuthModule {

}