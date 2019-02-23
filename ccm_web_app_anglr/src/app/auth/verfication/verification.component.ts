import { Component, OnInit, OnChanges } from '@angular/core'

import {Router} from '@angular/router'
import {AuthService} from '../../core/services/auth/auth.service'
import {User} from '../../core/models/user'
import {UIService} from '../../core/services/ui/ui.service'
import { StatusService }from '../../core/services/user/status.service'
import { Message } from "../../core/models/message";
@Component({
    moduleId : module.id,
    templateUrl : 'verification.component.html',
    styleUrls : ['verification.component.css']
})
export class VerificationComponent implements OnInit {
    verificationCode: string
    successResponse: any;
    failedResponse: any;

    showCompletationForm : boolean = false;
    disableButton: boolean = false;
    
    Loadingpage= "none";
    Verificationpage= "block";
     user: User = new User()

    constructor(
        private _authService: AuthService,
        private _router: Router, 
        private _uiService: UIService,private _statusService:StatusService) {}

    verify() : void {
        if(this.verificationCode) 
        {
            this.Loadingpage= "block";
            this.Verificationpage= "none";
        
            this.disableButton = true
            this._authService.verifyKey(this.verificationCode.trim().toString())
                .subscribe(response => { 
                    if(response.status == 200) 
                    {
                       
                                    this._statusService.getStatus().subscribe(
                                        (response) => { 
                                            this.user = JSON.parse(response._body);
                                            
                                            this._authService.storeUser(this.user);
                                            // let getUser=this._authServices.getUser();
                                        
                                            // let status = getUser.userStatus;  
                                            
                                            // if(status == "Init")
                                            // {
                                            //     this._router.navigate(['/verification']);
                                            // }else if(status == "Verified")
                                            // {
                                            //     this._router.navigate(['/verification']);
                                            // }else if(status == "Completed" )
                                            // { 
                                            //     this._router.navigate(['/home']);
                                            // }
                                        },
                                        (error) => {
                                            
                                            let msg = new Message();
                                            msg.msg = "Something went wrong, please try again."
                                            msg.title=""
                                            msg.iconType=""
                                            // this._uiService.showToast(msg);
                                            // this.Loginpage= "block";
                                            this.Loadingpage= "none";    
                                            console.log(error)
                                        }
                                    )
            
                               

                        this.successResponse =  JSON.parse(response._body)
                        this.disableButton = false
                        this.showCompletationForm = true;
                    }
                }, error => 
                { 
                    this.failedResponse = "Invalid key";
                    this.disableButton = false;
                    this.Loadingpage= "none";
                    this.Verificationpage= "block";
                });    
        }else
        {
            this.failedResponse="Verification code is required.";
        }
    }

    ngOnInit() {
        let user = this._authService.getUser()
        if(!user) {
            return;
        }

        if(user.userStatus.toLowerCase() == 'verified')
        {
            this.successResponse = user;
            this.showCompletationForm = true;
        }
        else if(user.userStatus.toLowerCase() == 'completed') 
        {
            this._router.navigate(['home'])
        }
        else 
        {
            //do nothing
        }
    }


}