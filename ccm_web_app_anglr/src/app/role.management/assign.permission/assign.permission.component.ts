import { Component, Input, OnInit, Inject, Output, EventEmitter, AfterViewInit, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SetupService } from '../../core/services/setup/setup.service';
import { MappingService } from '../../core/services/mapping/mapping.service';

import { Role } from '../../core/models/role';
import { Permission } from '../../core/models/permission';
import { UtilityService } from '../../core/services/general/utility.service';
import { User } from '../../core/models/user';

// import { ConfirmationDialogComponent } from '../../shared/dialog-box/confirmation.dialog.component';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmationDialog.component';




@Component({
    selector: 'assign-permission',
    templateUrl: 'assign.permission.component.html',
    // styleUrls: ['../../admin.component.css']
})
export class AssignPermissionComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // permission: Permission = new Permission();

    searchKeywordR: string = null;
    pageIndexR: number = 0;
    pageSizeR: number = 5; // by default
    lengthR: number = 0;
    pageSizeOptionsR = [5, 10, 25, 50];
    // pageSizeOptions = [10];
    upperLimitR = 0;
    roleList: Role[] = [];
    permissions: Permission[] = [];

    viewRolePermissionListPermission = false;
    assignRolePermissionPermission = false;

    user: User = new User();
    clickMore = false;
    edit = false;
    role: Role = new Role();
    expandedIndex = -1;
    isSave = false;

    displayedColumns = ['sNo', 'roleName', 'permission(s)', 'action'];
    // displayedColumns = ['roleName', 'permission(s)'];
    dataSource = new MatTableDataSource<Role>(this.roleList);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isSpinner = false;
    filter: string = "";
    filter2: string = "";

    // displayedColumnsTwo = ['select', 'sNo', 'permission'];
    // displayedColumnsTwo = ['sNo', 'permission'];
    // displayedColumnsTwo = ['sNo', 'permissionType', 'permission'];
    displayedColumnsTwo = ['sNo', 'permission'];
    // displayedColumnsTwo = ['select'];
    dataSourceTwo = new MatTableDataSource<Permission>(this.permissions);
    selection = new SelectionModel<Permission>(true, []);
    isSpinnerTwo = false;

    constructor( @Inject('IAuthService')
    private _authService: IAuthService,
        private _uiService: UIService,
        private _router: Router,
        private utilityService: UtilityService,
        public dialog: MatDialog,
        private activateRoute: ActivatedRoute,
        private _setupService: SetupService,
        private _mappingService: MappingService,
    ) {

    }

    ngOnInit(): void {
        // Applying permission
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();

        // this.viewRolePermissionListPermission = this.utilityService.checkUserPermission(this.user, 'view_role_permission');
        this.viewRolePermissionListPermission = true;
        // this.assignRolePermissionPermission = this.utilityService.checkUserPermission(this.user, 'assign_role_permission');
        this.assignRolePermissionPermission = true;

        if (this.viewRolePermissionListPermission) {
            this.loadRoleList();
        }
        else {
            // this._router.navigate(['permission']);
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    applyFilter2(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceTwo.filter = filterValue;
    }

    refreshList() {
        console.log("refreshList");
        // if (this.viewRolePermissionListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;

        this.loadRoleList();
        // }
    }

    search() {
        this.loadRoleList();
    }

    refreshPermissionList() {
        console.log("refreshPermissionList");
        // if (this.viewRolePermissionListPermission) {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;

        this.loadPermissionList(this.role);
        // this.loadPermissionListViaOffsetLimit(this.role, 1, 5);
        // }
    }

    loadRoleList_bk() {
        if (this.viewRolePermissionListPermission) {
            this.isSpinner = true;
            this.dataSource = new MatTableDataSource<Role>([]);
            this.dataSource.paginator = this.paginator;
            const msg = new Message();

            this._setupService.getRolesWithPermissions().subscribe(
                (res) => {
                    this.roleList = res.json().data;
                    // console.log(this.roles);
                    this.dataSource = new MatTableDataSource<Role>(this.roleList);
                    this.dataSource.paginator = this.paginator;

                    if (this.roleList.length == 0) {
                        msg.msg = 'No Role Found';
                        msg.msgType = MessageTypes.Information;
                        msg.autoCloseAfter = 400;
                        this._uiService.showToast(msg, 'info');
                    }
                    this.isSpinner = false;
                },
                (err) => {
                    console.log(err);
                    this._authService.errStatusCheckResponse(err);
                    this.isSpinner = false;
                }
            );
        }
    }

    loadRoleList() {
        const msg = new Message();
        this.lengthR = 0;
        this.roleList = [];
        // this.dataSource = new MatTableDataSource<User>(this.userList);
        if (this.viewRolePermissionListPermission) {
            this.isSpinner = true;

            // this._uiService.showSpinner();

            this._setupService.getRolesWithCount(this.searchKeywordR).subscribe(
                (res) => {
                    // this._uiService.hideSpinner();
                    this.lengthR = res.json().data;

                    this._setupService.getRolesWithPgno(this.searchKeywordR, this.pageIndexR, this.pageSizeR).subscribe(
                        (res) => {
                            // this.userList = res.json();
                            // this._uiService.hideSpinner();
                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapRole(array[i]);
                                uList.push(u);
                            }
                            this.roleList = uList;

                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            // this.dataSource.paginator = this.paginator;
                            // console.log('user list:', this.userList);

                            if (this.roleList.length == 0) {
                                msg.msg = 'No Roles Found';
                                msg.msgType = MessageTypes.Information;
                                msg.autoCloseAfter = 400;
                                this._uiService.showToast(msg, 'info');
                            }
                            this.isSpinner = false;
                        },
                        (err) => {
                            console.log(err);
                            this._uiService.hideSpinner();
                            // this.dataSource = new MatTableDataSource<User>(this.userList);
                            this._authService.errStatusCheck(err);
                            this.isSpinner = false;
                        }
                    );

                },
                (err) => {
                    console.log(err);
                    this._uiService.hideSpinner();
                    this._authService.errStatusCheckResponse(err);
                    this.isSpinner = false;
                }
            );
        }
        else {
            this.isSpinner = false;
            let msg = this.utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }
    }

    loadPermissionListViaRole(role: Role) {
        console.log("role", role);
        const msg = new Message();
        this._setupService.getPermissionsViaRole(role.id).subscribe(
            (res) => {
                // this.permissions = res.json().data;


                let array = res.json().data || [];
                // console.log('res list:', array);
                var uList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._mappingService.mapPermission(array[i]);
                    uList.push(u);
                }
                this.role.permissions = uList;

                this.checkPermissionWithTable();

            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheckResponse(err);
                this.isSpinnerTwo = false;
            }
        );
    }

    loadPermissionList_bk(role: Role) {
        console.log("role", role);
        if (this.assignRolePermissionPermission) {
            this.isSpinnerTwo = true;
            const msg = new Message();
            this._setupService.getPermissions().subscribe(
                (res) => {
                    // this.permissions = res.json().data;
                    // console.log(this.roles);

                    let array = res.json().data || [];
                    // console.log('res list:', array);
                    var uList = [];
                    for (let i = 0; i < array.length; i++) {
                        let u = this._mappingService.mapPermission(array[i]);
                        uList.push(u);
                    }
                    this.permissions = uList;

                    this.dataSourceTwo = new MatTableDataSource<Permission>(this.permissions);
                    // this.dataSourceTwo.paginator = this.paginator;

                    this.checkPermissionWithTable();

                    // this.dataSourceTwo.data.forEach(row => {
                    //     role.permissions.forEach(row1 => {
                    //         if (row1.id == row.id) {
                    //             this.selection.select(row);
                    //         }
                    //     })
                    // })

                    if (this.permissions.length == 0) {
                        msg.msg = 'No Permissions Found';
                        msg.msgType = MessageTypes.Information;
                        msg.autoCloseAfter = 400;
                        this._uiService.showToast(msg, 'info');
                    }
                    this.isSpinnerTwo = false;
                },
                (err) => {
                    console.log(err);
                    this._authService.errStatusCheckResponse(err);
                    this.isSpinnerTwo = false;
                }
            );
        }
    }

    loadPermissionList(role: Role) {
        console.log("role", role);
        if (this.assignRolePermissionPermission) {
            this.isSpinnerTwo = true;
            const msg = new Message();
            this._setupService.getPermissionListCount().subscribe(
                (res1) => {

                    let length = res1.json().data || 0;

                    this._setupService.getPermissionsWithPgno(0, length).subscribe(
                        (res) => {
                            // this.permissions = res.json().data;
                            // console.log(this.roles);

                            let array = res.json().data || [];
                            // console.log('res list:', array);
                            var uList = [];
                            for (let i = 0; i < array.length; i++) {
                                let u = this._mappingService.mapPermission(array[i]);
                                uList.push(u);
                            }
                            this.permissions = uList;

                            this.dataSourceTwo = new MatTableDataSource<Permission>(this.permissions);
                            // this.dataSourceTwo.paginator = this.paginator;

                            this.checkPermissionWithTable();

                            // this.dataSourceTwo.data.forEach(row => {
                            //     role.permissions.forEach(row1 => {
                            //         if (row1.id == row.id) {
                            //             this.selection.select(row);
                            //         }
                            //     })
                            // })

                            if (this.permissions.length == 0) {
                                msg.msg = 'No Permissions Found';
                                msg.msgType = MessageTypes.Information;
                                msg.autoCloseAfter = 400;
                                this._uiService.showToast(msg, 'info');
                            }
                            this.isSpinnerTwo = false;
                        },
                        (err) => {
                            console.log(err);
                            this._authService.errStatusCheckResponse(err);
                            this.isSpinnerTwo = false;
                        }
                    );
                },
                (err) => {
                    console.log(err);
                    this._authService.errStatusCheckResponse(err);
                    this.isSpinnerTwo = false;
                }
            );
        }
    }

    checkPermissionWithTable() {
        this.selection = new SelectionModel<Permission>(true, []);

        this.dataSourceTwo.data.forEach(row => {
            this.role.permissions.forEach(row1 => {
                if (row1.id == row.id) {
                    this.selection.select(row);
                }
            })
        })

    }

    loadPermissionListViaOffsetLimit(val, pageNo, Limit) {
        // if (this.assignRolePermissionPermission) {
        this.isSpinnerTwo = true;
        const msg = new Message();
        this._setupService.getPermissionsViaOffsetLimit(pageNo, Limit).subscribe(
            (res) => {
                // this.permissions = res.json().data;
                let newData = res.json().data || [];

                this.permissions = this.utilityService.newDataInsertInArray(this.permissions, newData);
                // console.log(this.roles);
                this.dataSourceTwo = new MatTableDataSource<Permission>(this.permissions);
                // this.dataSourceTwo.paginator = this.paginator;


                this.dataSourceTwo.data.forEach(row => {
                    val.permissions.forEach(row1 => {
                        if (row1.id == row.id) {
                            this.selection.select(row)
                        }
                    }
                    )
                }
                )

                if (this.permissions.length == 0) {
                    msg.msg = 'No Permissions Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinnerTwo = false;
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheckResponse(err);
                this.isSpinnerTwo = false;
            }
        );
        // }
    }

    viewMore(field, role) {
        // console.log("test", role)

        const dialogRef = this.dialog.open(ViewRolePermission, {
            width: '450px',
            data: { field, role: role }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    onEdit(role: Role): void {
        console.log("onEdit");
        if (this.assignRolePermissionPermission) {
            this.edit = true;
            this.role = role;

            this.selection = new SelectionModel<Permission>(true, []);

            // this.dataSourceTwo = new MatTableDataSource<Permission>(this.role.permissions);
            this.loadPermissionListViaRole(role);
            this.loadPermissionList(role);
            // this.loadPermissionListViaOffsetLimit(val, pagNo, limit);
            // this.loadPermissionListViaOffsetLimit(val, 1, 5);


        }
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSourceTwo.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSourceTwo.data.forEach(row => this.selection.select(row));
    }

    openConfirmDialog(btn) {
        let msg;
        let obj;
        if (btn === 'assign') {
            obj = 'Assign Permission';
            msg = 'Are you sure to save your changes?';
        } else
            if (btn === 'reject') {
                // obj = 'Reject LawFirm';
                // msg = 'Are you sure you want to reject this LawFirm?';
            }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            data: { message: msg, obj: obj }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);
            if (result && result.status && btn === 'assign') {
                this.save();
            }

            if (result && btn === 'reject') {
                // this.disApproveLawFirm(lawFirm, index);
            }
        });
    }

    save() {
        // console.log("test role", this.role);
        // console.log("test", this.selection.selected);
        const msg = new Message();

        this.isSave = true;
        if (this.assignRolePermissionPermission) {

            if (this.selection.selected.length > 0) {
                this._setupService.assignPermissionToRole(this.role, this.selection.selected).subscribe(
                    (res) => {
                        this.isSave = false;
                        msg.msg = res.json().message ? res.json().message : 'You have successfully assign permissions';
                        msg.msgType = MessageTypes.Information;
                        msg.autoCloseAfter = 400;
                        this._uiService.showToast(msg, 'info');
                    },
                    (err) => {
                        console.log(err);
                        this.isSave = false;
                        this._authService.errStatusCheckResponse(err);
                    }
                );
            }
            else {
                this.isSave = false;
                msg.msg = 'No Permission selected';
                msg.msgType = MessageTypes.Error;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, '');
            }
        }
        else {
            this.isSave = false;
            let msg = this.utilityService.permissionMsg();
            this._uiService.showToast(msg, '');
        }

    }

    back() {
        this.edit = false;
        this.refreshList();
    }

}



@Component({
    selector: 'view-role-permission',
    templateUrl: 'view.permission.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class ViewRolePermission {

    role: Role = new Role();
    fieldType: string;

    constructor(
        public dialogRef: MatDialogRef<ViewRolePermission>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: SetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        this.role = data.role;
        // console.log("test1",this.role)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        this.dialogRef.close();
    }

}