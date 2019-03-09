import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation, OnInit, OnDestroy, AfterViewInit, NgZone
} from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
// import { DoctorScheduleService, OffDays, Holidays, Schedule } from "../../core/services/doctor/doctor.schedule.service";
import { DoctorScheduleService, OffDays, Holidays } from "../../core/services/doctor/doctor.schedule.service";
import { colors } from './calender-utils/colors';
import { Subject } from 'rxjs/Subject';

import { Message } from "../../core/models/message";
import { UIService } from "../../core/services/ui/ui.service";
import { MatDialogRef, MatDialog } from "@angular/material";
import { AuthService } from '../../core/services/auth/auth.service'
import { DayViewHour } from 'calendar-utils';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay
} from 'date-fns';
import { User } from '../../core/models/user';
import { MappingService } from '../../core/services/mapping/mapping.service';
import { Schedule } from '../../core/models/schedule.model';
// import { StatusService } from '../../core/services/user/status.service';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';

@Component({
  selector: 'mySchedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calender.myschedule.component.html',
  // don't do this in your app, its only so the styles get applied globally
  styleUrls: ['calender.component.css'],
  styles: [
    `
      .red-cell {
        background-color: red !important;
      }
      .blue-cell {
        background-color: blue !important;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalenderMyscheduleComponent implements OnInit, OnDestroy {
  view: CalendarPeriod = 'month';

  viewDate: Date = new Date();
  TimeZone;
  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDatesOffDay = new Array;
  // selectedDatesWorkingDay1: any;
  // selectedDatesWorkingDay: Schedule[];
  scheduleList: Schedule[] = [];
  schedule: Schedule = new Schedule();
  PerDaySchedule: Schedule;

  selectedDayViewDate: Date;

  dayView: DayViewHour[];
  showtemplate = false;

  events: CalendarEvent[] = [];
  // currentyear;
  // currentmonth;
  offDays: OffDays[];
  LoadingPage = 'none';
  LoadingPageload = 'none';
  calenderView = 'block';
  holidays: Holidays[];

  minDate: Date = addMonths(new Date(), -12);

  maxDate: Date = addMonths(new Date(), 12);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  timezoneoffset: number;
  clickedBox;
  Color = false;

  user: User = new User();
  docId: number = null;
  month: number = null;
  year: number = null;
  currentDate: any;

  constructor(private dialog: MatDialog,
    // private _statusService: StatusService,
    private _authServices: AuthService,
    private _doctorScheduleService: DoctorScheduleService,
    private _uiService: UIService,
    private _mappingService: MappingService,
    private _zone: NgZone
  ) {
    this.user = this._authServices.getUser();

    this.docId = this.user.id;

    this.currentDate = new Date();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    // this.getState();
    this._doctorScheduleService.invokeEvent.subscribe(value => {
      if (value === 'refresh') {
        this.today();
      }
    });
    // this.dateOrViewChanged();
    // this.getTimezone();
  }
  ngOnInit() {

    // this.user = this._authServices.getUser();

  }

  ngOnDestroy() {
    this.dialog.closeAll();
  }
  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));

    console.log("decrement month ", (this.viewDate.getMonth() + 1));
    console.log("decrement year ", this.viewDate.getFullYear());

    this.getDocSchedule(this.docId);
    // this.getSchedule(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1))
    // this.getOffDays(this.viewDate.getFullYear(), this.viewDate.getMonth());
    // this.getHolidays(this.viewDate.getFullYear());

  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));

    console.log("decrement month ", (this.viewDate.getMonth() + 1));
    console.log("decrement year ", this.viewDate.getFullYear());

    this.getDocSchedule(this.docId);
    // this.getSchedule(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1))
    // this.getOffDays(this.viewDate.getFullYear(), this.viewDate.getMonth());
    // this.getHolidays(this.viewDate.getFullYear());
  }

  today(): void {
    //  this.changeDate(new Date());

    this.getDocSchedule(this.docId);
    // this.getSchedule(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1))
    // this.getOffDays(this.viewDate.getFullYear(), this.viewDate.getMonth());
    // this.getHolidays(this.viewDate.getFullYear());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }
  getTimezone() {

    var d = new Date();
    var offset = d.getTimezoneOffset();

    // this._statusService.getUserInfo().subscribe(
    //   (response) => {
    //     let getUser = response;
    //     if (getUser != null) {
    //       offset = offset + (getUser.utcDSTOffset / 60);
    //       this.timezoneoffset = offset;
    //     }
    //   },
    //   (error) => {

    //   }
    // );
  }

  dayClicked(day: CalendarMonthViewDay): void {


    var date = day.date.getDate().toString();
    var month = (day.date.getMonth() + 1).toString();
    var year = day.date.getFullYear();

    if (date.length < 2) {
      date = '0' + date
    }
    if (month.length < 2) {
      month = '0' + month
    }

    // day.cssClass  = 'css-spiner';

    // this.getDocSchedule(this.docId);
    this.getScheduleDay(year, month, date);


  }

  getScheduleDay(currentyear, currentmonth, currentday) {

    this.clickedBox = currentyear + '-' + currentmonth + '-' + currentday;
    // for (var index = 0; index < this.selectedDatesWorkingDay1.DoctorScheduleDetails.length; index++) {
    for (var index = 0; index < this.schedule.scheduleDetails.length; index++) {

      var str = this.schedule.scheduleDetails[index].scheduleDate;
      // var res = str.split("T");
      // if (this.clickedBox == res[0]) {
      if (this.clickedBox == str) {

        let msg = new Message();
        msg.showInput = "loader";
        msg.title = "";
        this._uiService.showMsgBox(msg);
        // this._specialistScheduleService.getScheduleDay(currentyear, currentmonth, currentday)
        //   .subscribe(
        //     (response) => {

        //       if (response.status == 200) {
        //         this.PerDaySchedule = JSON.parse(response._body);





        //         msg.msg = currentday;
        //         msg.title = "";
        //         msg.okBtnTitle = null;
        //         msg.onOkBtnClick = null;
        //         msg.cancelBtnTitle = "OK";
        //         msg.selectedDatesWorkingDay = this.PerDaySchedule[0];
        //         // msg.onCancelBtnClick=;

        //         msg.showInput = "scheduebox";
        //         this._uiService.closeMsgBox(msg);
        //         this._uiService.showMsgBox(msg);



        //       } else {

        //         let message = new Message()
        //         message.title = 'Error'
        //         message.msg = "No details were found this Schedule";
        //         message.iconType = 'error';
        //         message.type = 'danger'
        //         this._uiService.showToast(message)
        //         this._uiService.closeMsgBox(msg);
        //         this.dialog.closeAll();

        //       }
        //     },
        //     (error) => {


        //       let message = new Message()
        //       message.title = 'Error'
        //       message.msg = "No details were found this Schedule";
        //       message.iconType = 'error';
        //       message.type = 'danger'
        //       this._uiService.showToast(message)
        //       this._uiService.closeMsgBox(msg);
        //       this.dialog.closeAll();
        //     }
        //   );

      }

    }

  }

  getDocSchedule(docId) {
    console.log("decrement month ", (this.viewDate.getMonth() + 1));
    console.log("decrement year ", this.viewDate.getFullYear());

    this.LoadingPageload = 'block';
    this.calenderView = 'none';
    // this._doctorScheduleService.getDocSchedule(docId, this.user.id, this.month, this.year).subscribe(
    this._doctorScheduleService.getDocSchedule(docId, this.user.id, this.viewDate.getMonth(), this.viewDate.getFullYear()).subscribe(

      (response) => {

        console.log("schedule res", response);
        this.LoadingPageload = 'none';
        this.calenderView = 'block';
        // if (response.status == 200) {

        // this.selectedDatesWorkingDay1 = response.json().data;
        let array = response.json().data;

        // let sList = []
        // if (array && array.length > 0) {

        //   array.forEach(element => {
        //     sList.push(this._mappingService.mapSchedule(element));
        //   });

        // }
        this.schedule = this._mappingService.mapSchedule(array);

        console.log("schedule", this.schedule);
        // console.log("selectedDatesWorkingDay1", this.selectedDatesWorkingDay1);
        //   this.selectedDatesWorkingDay = JSON.parse(response._body);


        this.refreshView();

        // }
      },
      (error) => {

        this.LoadingPageload = 'none';
        this.calenderView = 'block';
        this.refreshView();
        let msg = new Message();
        msg.msg = "Something went wrong, please try again."
        // msg.title=""
        // msg.iconType=""
        this._uiService.showToast(msg, "");

      }
    );
  }

  refresh: Subject<any> = new Subject();

  cssClass: string = RED_CELL;

  // events$: Observable<Array<CalendarEvent<{ offDays: OffDays }>>>;
  refreshView(): void {
    this.cssClass = this.cssClass === RED_CELL ? BLUE_CELL : RED_CELL;
    this.refresh.next();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {

    console.log("beforeMonthViewRender");
    body.forEach(day => {

      // if (this.selectedDatesWorkingDay1 && this.selectedDatesWorkingDay1.DoctorScheduleDetails && this.selectedDatesWorkingDay1.DoctorScheduleDetails.length > 0) {

      //   this.selectedDatesWorkingDay1.DoctorScheduleDetails.forEach(d => {

      //     if (day.date.getDate() == d.ScheduleDate && d.IsOffDay == 0) {
      //       day.cssClass = this.cssClass;
      //     }

      //   });

      // }

      // if (day.date.getDate() % 2 === 1) {
      //   day.cssClass = this.cssClass;
      // }

    });

    if (!this.showtemplate) {

      this.getDocSchedule(this.docId);
      this.showtemplate = !this.showtemplate;
    }
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    this.dayView = dayView;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.dayView.forEach(hourSegment => {
      hourSegment.segments.forEach(segment => {
        delete segment.cssClass;
        if (
          this.selectedDayViewDate &&
          segment.date.getTime() === this.selectedDayViewDate.getTime()
        ) {
          segment.cssClass = 'cal-day-selected';
        }
      });
    });
  }
}

