import { Component, Inject, Input, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ScheduleService } from '../../../core/services/schedule/schedule.service';
import { UIService } from '../../../core/services/ui/ui.service';
import { Message } from '../../../core/models/message'
// import { min } from 'date-fns';
import { DateTimeUtils } from '../../utils/datetime.utils'
import { ValidationUtils } from '../../utils/validation.utils';
import { UserService } from '../../../core/services/user/user.service'
@Component({
    selector: 'home-dialog',
    styleUrls: ['./scheduler.dialog.css'],
    templateUrl: './scheduler.dialog.html',
})
export class SupervisorSchedulerDialogComponent implements OnInit {

    constructor(private schedule: ScheduleService,
        private _userService: UserService,
        private uiService: UIService,
        private dateTimeUtils: DateTimeUtils,
        private validationUtils: ValidationUtils,
        public dialogRef: MatDialogRef<SupervisorSchedulerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
    selectedDoctor: Array<any> = [];
    listOfDoctors = []

    priorities = [];

    shifts = [];

    selectedSpecialityID;
    partnerSiteID;

    deletionOfSelectedSpecialistRecord = [];

    hiddenLoader: boolean = true
    hiddenList: boolean = true
    hiddenCalendar: boolean = true
    hiddenSaveLoader: boolean = true
    hiddenButton: boolean = false
    timeZone: string;
    error: string;
    defaultZone: number = 3;

    hours: any;
    minutes: any;


    ngOnInit() {
        this.hiddenLoader = false;
        this.hiddenList = true;

        this.timeZone = 'Specialist'
        this.createTime();

        this.schedule.getShifts().subscribe(
            (res) => this.shifts = JSON.parse(res._body),
            (err) => {}
        );
        this.populate();
    }

    /** 
     * In this method, three different acitivies are performed
     * Getting the list of available consultant, Creating the list of priorities
     * Loading if previously selected specialists.
    */

    populate() {
        this.selectedSpecialityID = this.data.speciality
        this.partnerSiteID = this.data.partnerSiteID


        // this._userService.getNonSpecialistUser(null, 0, 10000).subscribe(
        //     (res) => {
        //         this.listOfDoctors = JSON.parse(res._body);
        //         this.createPrioritiesList();
        //         this.loadPreviousSelectedSpecialist(this.data)
        //     },
        //     (err) => {}
        // )
    }

    /** 
     * First validate the user input and then call the http service to save the data
    */
    save() {
        if (this.validationUtils.ifPassedDate(this.data)) {
            this.createToastMessage(
                {
                    msg: 'Passed date cannot be modified',
                    iconType: 'error',
                    type: 'danger'
                }
            )
            return;
        }
        let forChanges = []
        forChanges.push(this.selectedDoctor);
        forChanges.push(this.deletionOfSelectedSpecialistRecord);

        let flattenChanges = [].concat.apply([], forChanges);

        if (flattenChanges.length == 0) {
            this.createToastMessage({
                msg: 'No specialist(s) selected or deleted',
                iconType: 'done',
                type: 'success'
            });
            return;
        }

        //Create the loop in the array of data and check
        //if user has not missed any field such as priority, start time and shift
        for (let f of flattenChanges) {
            let isValid = this.isValidateUserInput(f);
            if (!isValid)
                return;
        }

        //More filter for Shift, Start time and Priority selected
        // This functionality has unit test written
        let verified = this.validationUtils.verifyGivenData(flattenChanges);
        if (!verified) {
            this.createToastMessage({
                msg: 'Priority should be different for same shifts',
                iconType: 'error',
                type: 'danger'
            });
            return;
        }
        // Since we never create start time and end time, we need to create it at the time 
        // of saving, this is looping the array of specialist and creating their start and 
        // end time
        flattenChanges.forEach(f => {
            let times = this.dateTimeUtils.convertTimeToDate(this.timeZone, f);
            let timesUTC = this.dateTimeUtils.convertTimeToDateUTC(this.timeZone, f);

            f.startTimeInUTC = timesUTC;
            f.startTime = times;
            // if(this.timeZone == 'Specialist' || this.timeZone == 'Local')
            // {
            f.endTime = this.dateTimeUtils.createEndTime(f.displayStartDate, this.shifts, f.Shift, f.displayStartTime)
            // }
            // else
            // {
            f.endTimeInUTC = this.dateTimeUtils.createEndTime(f.displayStartDateInUTC, this.shifts, f.Shift, f.displayStartTimeInUTC)
            // }
        });

        //Final generation of data
        let data =
            {
                // PartnerSiteId: this.partnerSiteID,
                SpecialityId: this.selectedSpecialityID,
                // Year: this.data.year,
                // Month: this.data.month,
                // Day: this.data.date,
                InTimeZone: this.timeZone == 'Local' || this.timeZone == 'Specialist' ? 'Supervisor' : 'UTC',
                Details: flattenChanges
            }



        this.hiddenSaveLoader = false
        this.hiddenButton = true
        this.callSaveService(data);
    }

    /**
     * Remove the selected specialists
     * @param doctor The list selected doctors
     */
    remove(doctor) {
        let value = this.selectedDoctor.filter(s => doctor == s.id)[0];
        this.selectedDoctor = this.selectedDoctor.filter(s => s.id != doctor);

        // For deletion in server/database
        let toDelete = {
            id: value.id,
            Priority: value.Priority,
            IsDeleted: true,
            Shift: value.Shift,
            supervisorUserId: value.id,
            specialityId: this.selectedSpecialityID,
            UtcDSTOffsetInSeconds: value.UtcDSTOffsetInSeconds,
            displayStartTime: value.displayStartTime,
            displayStartTimeInUTC: value.displayStartTimeInUTC,
            displayStartDate: value.displayStartDate,
            displayStartDateInUTC: value.displayStartDateInUTC,
        }
        // If the Id == 0 therefore no need to remove from database
        // Only remove from UI.
        if (toDelete.id != 0)
            this.deletionOfSelectedSpecialistRecord.push(toDelete);

        value.id = toDelete.supervisorUserId
        value.utcDSTOffsetInSeconds = toDelete.UtcDSTOffsetInSeconds

        // Make the delete specialist in aviable list
        this.listOfDoctors.push(value)
    }

    /**
     * For adding to list of selected specialist
     * @param id Add to selected list
     */
    add(id) {
        let selectedValue = this.listOfDoctors
            .filter(s => id == s.id)
        if (selectedValue.length == 0)
            return;

        let value = {
            IsDeleted: false,
            ShiftId: selectedValue[0].ShiftId,
            Priority: parseInt(selectedValue[0].Priority),
            supervisorUserId: parseInt(selectedValue[0].id),
            specialityId: this.selectedSpecialityID,
            firstName: selectedValue[0].firstName,
            lastName: selectedValue[0].lastName,
            UtcDSTOffsetInSeconds: selectedValue[0].utcDSTOffsetInSeconds,
            utcDSTOffsetInSeconds: selectedValue[0].utcDSTOffsetInSeconds,
            displayStartTime: '',
            displayStartTimeInUTC: '',
            displayStartTimeInLocal: '',
            timeZoneDescription: selectedValue[0].timeZoneDescription,
            displayStartDate: this.getDate(),
            displayStartDateInUTC: this.getDate(),
            displayStartDateInLocal: this.getDate(),

            id: 'add' + this.selectedDoctor.length,
        }
        this.listOfDoctors = this.listOfDoctors
            .filter(s => s.id != id)

        this.selectedDoctor.push(value);
    }

    setPriority(p, id) {
        this.selectedDoctor.map(s => {
            if (id == s.id)
                s.Priority = parseInt(p);
        });
    }
    setShift(v, id) {
        this.selectedDoctor.map(s => {
            if (id == s.id) {
                s.Shift = v;
                //s.ShiftEndtime = this.dateTimeUtils.createEndTime(this.getDate(), this.shifts, v, s.displayStartTime);
            }
        });
    }

    close() {
        this.dialogRef.close()
    }

    e = { hour: null, minute: null };
    changedStartTime(event, utcOffset, id, hOrM) {
        if (hOrM == 'm') {
            this.e.minute = event.minute;
            this.e.hour = event.hour;
        }
        if (hOrM == 'h') {
            this.e.hour = event.hour;
            this.e.minute = event.minute;
        }

        event = this.e;
        this.selectedDoctor.forEach(s => {
            if (id == s.id) {
                s = this.clearDates(s);

                if (this.timeZone == 'UTC') {
                    s.displayStartDateInUTC = this.getDate()
                    s = this.conversionForUTCSelected(s, event, utcOffset);
                }
                else if (this.timeZone == 'Local') {
                    s.displayStartDateInLocal = this.getDate()
                    s = this.conversionForLocalSelected(s, event, utcOffset);
                }
                else {
                    s.displayStartDate = this.getDate()
                    s = this.conversionForSpecialistSelected(s, event, utcOffset);
                }

            }
        })
    }

    changeTimeZone(event) {
        if (event == 1) {
            this.timeZone = 'Local'
            return;
        }
        if (event == 2) {
            this.timeZone = 'UTC'
            return;
        }
        if (event == 3) {
            this.timeZone = 'Specialist'
            return;
        }
    }

    doctorId: number = 0;
    /**
     * For UI purpose, we need to highlight the doctor selected with color in the table
     * @param id The doctor id selected in table
     */
    selectDoctor(id) {
        this.doctorId = id;
    }

    private createPrioritiesList() {
        this.priorities = []
        let length = this.listOfDoctors.length;
        for (let i = 1; i < length + 1; i++) {
            this.priorities.push({ id: i, name: i + '' })
        }
    }

    private createToastMessage(obj) {
        let message = new Message()
        message.msg = obj.msg
        // message.type = obj.type
        message.iconType = obj.iconType
        this.uiService.showToast(message,"");
    }

    private findShiftId(start, end) {
        let d1: any = new Date(start)
        let d2: any = new Date(end);

        let hours = 1000 * 60 * 60;
        let diff = (d2 - d1) / hours;
        let shift = this.shifts.filter(s => s.durationInHours == diff);
        if (shift.length == 0)
            return 1;
        return shift[0].id
    }

    private getDate() {
        let month = this.dateTimeUtils.appendZero(this.data.month);
        let date = this.dateTimeUtils.appendZero(this.data.date);

        return this.data.year + '-' + month + '-' + date;
    }

    private filterSelectionSpecialist(tempStore) {
        this.selectedDoctor = tempStore;
        this.listOfDoctors = this.listOfDoctors
            .filter(l => tempStore.filter(t => t.id == l.id).length == 0)
    }

    /**
     * Get the list of previously select specialist.
     * Internally this method has a complex data structure in order to incoperate 
     * witht the UI
     * @param data List of avialble specialist 
     */
    private loadPreviousSelectedSpecialist(data) {
        this.schedule.getSupervisorScheduleDay(data).subscribe(
            (resp) => {
                this.hiddenLoader = true
                this.hiddenList = false

                let result = JSON.parse(resp._body)
                if (!result)
                    return;
                // let details = result[0].details

                let tempStore = [];
                result.map(d => {
                    //For seperating time and date for date and time UI in HTML
                    let conversionToLocalStart = this.dateTimeUtils.convertToLocal(
                        {
                            date: this.dateTimeUtils.trimToDate(d.startTimeInUTC),
                            time: this.dateTimeUtils.trimToTime(d.startTimeInUTC)
                        });

                    let startTime = this.dateTimeUtils.trimToTime(d.startTime);
                    let startTimeInUTC = this.dateTimeUtils.trimToTime(d.startTime);
                    //Notice three types of display time and date for different time zones
                    let data = {
                        id: d.id,
                        supervisorUserId: d.id,
                        specialityId: this.selectedSpecialityID,
                        IsDeleted: false,
                        Priority: parseInt(d.priority),
                        Shift: this.findShiftId(d.startTime, d.endTime),
                        firstName: d.supervisorFirstName,
                        lastName: d.supervisorLastName,
                        displayStartTime: this.dateTimeUtils.getTimeInObject(startTime),
                        displayStartTimeInUTC: this.dateTimeUtils.getTimeInObject(startTimeInUTC),
                        displayStartTimeInLocal: this.dateTimeUtils.getTimeInObject(conversionToLocalStart.time),
                        displayStartDate: this.dateTimeUtils.trimToDate(d.startTime),
                        displayStartDateInUTC: this.dateTimeUtils.trimToDate(d.startTimeInUTC),
                        displayStartDateInLocal: conversionToLocalStart.date,
                        UtcDSTOffsetInSeconds: d.utcDSTOffsetInSeconds,
                        timeZoneDescription: d.timeZoneDescription
                    }
                    tempStore.push(data)
                })
                //Filter out the previously selected specialist with avialable specialist if found
                this.filterSelectionSpecialist(tempStore)
            },
            (err) => {}
        )
    }

    private isValidateUserInput(f) {
        if (typeof parseInt(f.Priority) == 'undefined' || isNaN(f.Priority)) {
            this.createToastMessage({
                msg: 'Priority cannot be empty',
                iconType: 'error',
                type: 'danger'
            });
            return false;
        }
        if (f.displayStartTime == "" || typeof f.displayStartTime == 'undefined' || f.displayStartTime == null) {
            this.createToastMessage({
                msg: 'Start time cannot be empty',
                iconType: 'error',
                type: 'danger'
            });
            return false;
        }
        if (!f.displayStartTime.hour || !f.displayStartTime.minute) {
            this.createToastMessage({
                msg: 'Enter valid start time',
                iconType: 'error',
                type: 'danger'
            });
            return false;
        }
        if (!f.Shift) {
            this.createToastMessage({
                msg: 'Shift cannot be empty',
                iconType: 'error',
                type: 'danger'
            });
            return false;
        }
        return true;
    }

    private callSaveService(data) {
        for (var index = 0; index < data.Details.length; index++) {

            if (isNaN(data.Details[index].id)) {
                data.Details[index].id = 0;
            }

        }
        this.schedule.saveSupervisorScheduleChanges(data).subscribe(
            (res) => {
                this.data.calender.refreshView();
                this.deletionOfSelectedSpecialistRecord = []
                this.selectedDoctor = []
                this.listOfDoctors = [];

                this.dialogRef.close()
                this.hiddenButton = false
                this.hiddenSaveLoader = true;
                let success = new Message()
                success.msg = 'Data successfully uploaded'
                // success.type = 'success'
                success.iconType = 'done'
                this.uiService.showToast(success,"");
            },
            (err) => {
                let e = err._body;

                var message = {
                    msg: e,
                    iconType: 'error',
                    type: 'danger'
                };
                if (err.status == 401) {
                    message.msg = 'Login session expired'
                }

                this.createToastMessage(message);
                this.hiddenButton = false
                this.hiddenSaveLoader = true;
            }
        );
    }

    private conversionForSpecialistSelected(s, event, utcOffset) {
        event = { hour: event.hour || '00', minute: event.minute || '00' }
        let eventInStr = event.hour + ':' + event.minute;
        let conversionUTC = this.dateTimeUtils.convertToUTC(this.getDate(), eventInStr, utcOffset);
        let conversionToLocal = this.dateTimeUtils.convertToLocal(
            this.dateTimeUtils.convertToUTC(this.getDate(), eventInStr, utcOffset));

        s.displayStartTime = event;

        s.displayStartTimeInUTC = this.dateTimeUtils.getTimeInObject(conversionUTC.time);
        s.displayStartTimeInLocal = this.dateTimeUtils.getTimeInObject(conversionToLocal.time);

        s.displayStartDateInUTC = conversionUTC.date
        s.displayStartDateInLocal = conversionToLocal.date;
        return s;
    }

    private conversionForUTCSelected(s, event, utcOffset) {
        event = { hour: event.hour || '00', minute: event.minute || '00' }
        s.displayStartTimeInUTC = event;
        let eventInStr = event.hour + ':' + event.minute;
        let inUtc = { date: this.getDate(), time: eventInStr }
        let conversionToLocal = this.dateTimeUtils.convertToLocal(inUtc);
        let conversionToSpecified = this.dateTimeUtils.convertToSpecifiedUTCOffset(this.getDate(), eventInStr, utcOffset);

        s.displayStartTimeInLocal = this.dateTimeUtils.getTimeInObject(conversionToLocal.time);
        s.displayStartDateInLocal = conversionToLocal.date;

        s.displayStartTime = this.dateTimeUtils.getTimeInObject(conversionToSpecified.time);
        s.displayStartDate = conversionToSpecified.date;

        return s;
    }

    private conversionForLocalSelected(s, event, utcOffset) {
        event = { hour: event.hour || '00', minute: event.minute || '00' }
        let eventInStr = event.hour + ':' + event.minute;
        s.displayStartTimeInLocal = event;
        let inLocal = { date: this.getDate(), time: eventInStr }

        let conversionToUTC = this.dateTimeUtils.getLocalUTC(inLocal.date, inLocal.time);
        let conversionToSpecified =
            this.dateTimeUtils.convertToSpecifiedUTCOffset(conversionToUTC.date, conversionToUTC.time, utcOffset);

        s.displayStartTimeInUTC = this.dateTimeUtils.getTimeInObject(conversionToUTC.time);
        s.displayStartDateInUTC = conversionToUTC.date;

        s.displayStartTime = this.dateTimeUtils.getTimeInObject(conversionToSpecified.time);
        s.displayStartDate = conversionToSpecified.date;

        return s;
    }

    private clearDates(s) {
        s.displayStartTimeInUTC = '';
        s.displayStartDateInUTC = '';

        s.displayStartTime = '';
        s.displayStartDate = '';

        s.displayStartDateInLocal = '';
        s.displayStartTimeInLocal = '';
        return s;
    }

    private createTime() {
        let hoursIds = Array.from({ length: 24 }, (x, i) => i);
        let minutesIds = Array.from({ length: 60 }, (x, i) => i);

        this.hours = hoursIds.map(h => h.toString().length == 1 ? '0' + h : h)
        this.minutes = minutesIds.map(h => h.toString().length == 1 ? '0' + h : h)
    }
}