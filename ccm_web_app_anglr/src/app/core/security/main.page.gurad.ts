import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';

//ACTIVATE GUARD FOR BRAND AND INFLUENCER
@Injectable()
export class CanActivateViaMainGuard implements CanActivate {

    loginUser: User = new User();
    
    constructor( @Inject('IAuthService') private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authInfo = this.authService.isLoggedIn();
        //if true then return else go to landing page
        if (authInfo) {
            // this.router.navigate(['/admin/home']);

            // this.router.navigate(['/admin/a/a/home']);

            this.loginUser = this.authService.getUser();

            // if (this.loginUser.department.departmentCode == "lg") {
            //     this.router.navigate(['/admin/a/a/home']);
            // }
            // else {
            //     this.router.navigate(['/home']);
            // }
            
            
            this.router.navigate(['/home']);
            console.log('authInfo', authInfo);
        } else {
            return true;
        }

    }
}
