import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmation.dialog.component.html',
})


export class ConfirmationDialogComponent implements OnInit {

    user: User = new User();
    confirm = true;
    msg: string;
    title: string;
    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,

    ) {
        console.log("data", data);
        this.msg = data.message;
        this.title = data.title;
    }

    ngOnInit(): void {

    }

    onYesClick(): void {
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
