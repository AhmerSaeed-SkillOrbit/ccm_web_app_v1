
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Message, MessageTypes } from '../../models/message';
import { Config } from '../../../config/config';
import { User } from '../../models/user';

@Injectable()
export class UtilityService {

    public checkUserPermission(user, permissionCodeName): any {

        let permission = false;

        // for always return true
        // permission = true;
        if (user && user.permissions instanceof Array) {

            user.permissions.forEach(element => {
                // check permission exist
                if (element.permissionCode === permissionCodeName) {
                    permission = true;
                }
            });
        }
        return permission;
    }

    public checkUserPermissionViewPermissionObj(permissions, permissionCodeName): any {

        let permission = false;

        // for always return true
        // permission = true;
        if (permissions && permissions instanceof Array) {

            permissions.forEach(element => {
                // check permission exist
                if (element.permissionCode === permissionCodeName) {
                    permission = true;
                }
            });
        }
        return permission;
    }

    public getUserPermissionTooltipMsg(permission, buttonSubmitted, buttonTooltip): any {
        // console.log('permission ', permission);
        // console.log('buttonSubmitted ', buttonSubmitted);
        // console.log('buttonTooltip ', buttonTooltip);
        let msg = "";
        msg = (!permission ? "Dont Have Permission" : (buttonSubmitted ? "Processing" : buttonTooltip || ""));

        return msg;
    }

    public permissionMsg(): any {
        // let msg = "";
        // msg = "Dont Have Permission";
        const msg = new Message();
        msg.title = '';
        msg.iconType = '';

        msg.msg = Config.msg.permissionPop;
        msg.msgType = MessageTypes.Error;
        msg.autoCloseAfter = 400;

        return msg;
    }


    /* 
    send user full object
    send dataRole in array . e.g: ['roleCode1','roleCode2']
    */
    public checkRoleAllowed(user: User, dataRole): any {

        // console.log("checkCustomRoleAllow ", dataRole);
        let result: boolean = false;
        // if (this.user.roles.length > 0 && this.user.roles[0].roleCode != 'cad') {
        if (user.roles.length > 0 && dataRole.length > 0) {
            dataRole.forEach(element => {
                if (element == user.roles[0].roleCode) {
                    result = true;
                }
            });
        }

        return result;
    }

    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

    public newDataInsertInArray(oldArray, newArray): any {
        let data = oldArray || [];

        if (newArray.length > 0) {
            newArray.forEach(element => {
                let check = 0;
                oldArray.forEach(element1 => {
                    if (element.id == element1.id) {
                        check = 1;
                    }
                });
                if (check == 0) {
                    data.push(element);
                }
            });
        }

        return data;
    }

    public dateDifferenceInMonth(date = new Date(), diffNumber = 0): any {

        var newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth() - diffNumber, date.getDate()));

        return newDate;
    }

    public dateDifferenceInDays(startDate, endDate): any {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        var days = 0;

        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        console.log('date1', date1);
        console.log('date2', date2);
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        console.log('date1_ms', date1_ms);
        console.log('date2_ms', date2_ms);

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        days = Math.round(difference_ms / one_day);
        console.log('days', days);

        return days;
    }

    public addDaysInDate(noOfDays = 0, date): any {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;
        var date1 = new Date(date);
        console.log('date1', date1);
        if (date) {
            // Convert both dates to milliseconds
            var date1_ms = date1.getTime();

            console.log('date1_ms', date1_ms);

            // Calculate the addition in milliseconds
            var addition_ms = date1_ms + (noOfDays * one_day);

            date1.setTime(addition_ms);
            return date1;
        }

        return null;

    }

    public deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }

    public convertTime12to24(time12h: any) {

        if (time12h) {
            const [time, modifier] = time12h.split(' ');

            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
        }

        return null;

    }
}

