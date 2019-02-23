import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';

// ACTIVATE GUARD FOR BRAND AND INFLUENCER
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {


    constructor(@Inject('IAuthService')private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const authInfo = this.authService.isLoggedIn();
        // const authInfo = true;
        console.log('authInfo', authInfo);
        // if true then return else go to landing page
        if (authInfo) {
            return true;
        } else {
            // return true;
            this.authService.loginStatusChanged.next(null);
            this.authService.loginUserStatusChanged.next(null);
            this.router.navigate(['/']);
        }

    }
}
