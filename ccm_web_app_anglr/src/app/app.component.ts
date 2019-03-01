import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';

import { User } from './core/models/user';

import { UIService } from './core/services/ui/ui.service';
import { RoutingInfoService } from './core/services/routInfo/route.info.service';
import { IAuthService } from './core/services/auth/iauth.service';
import { UserService } from './core/services/user/user.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  user: User = new User();
  title = 'app';
  isLoggedIn = false;
  loading = false;


  constructor(
    private _router: Router,
    private _uiService: UIService,
    // public message: MessagingService,
    private _userService: UserService,
    private _routingInfo: RoutingInfoService,
    @Inject('IAuthService') private _authService: IAuthService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    // this._uiService.initCaptions();

    // this._messaging.getPermission();

    // this._uiService.getProfile();

    // this._routingInfo.init(); // init public navigation

    // get loggedin status
    this.user = this._authService.getUser();
    this.isLoggedIn = this._authService.isLoggedIn();
    if (this.isLoggedIn) {

      this._userService.getStatus().subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          // console.log('err', err);
        }
      );

      this._userService.getUserRole().subscribe(
        (res) => {
          console.log("res", res);
        },
        (err) => {
          // console.log('err', err);
        }
      );
    }

    // get updates


    this._authService.loginStatusChanged.subscribe(
      (user) => {

        this.isLoggedIn = this._authService.isLoggedIn();
      }
    );



    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
    this._router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
        }
      });
  }
}
