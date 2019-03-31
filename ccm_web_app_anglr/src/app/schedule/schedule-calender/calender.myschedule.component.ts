import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation, OnInit, OnDestroy, AfterViewInit, NgZone
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
import { AppointmentDialogeComponent } from '../../shared/appointment.dialoge/appointment.dialoge.component';
import { Config } from '../../config/config';
import { BehaviorSubject } from 'rxjs';
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
  appData = new BehaviorSubject<Date>(this.viewDate);
  // private appData = new BehaviorSubject<any[]>([]);

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

  isSubmmited: boolean = false;
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

  minYear = Config.year.min;
  maxYear = Config.year.max;
  years = [];

  months = Config.months;

  sch: Schedule = new Schedule()

  constructor(private dialog: MatDialog,
    // private _statusService: StatusService,
    private route: ActivatedRoute, private _router: Router,
    private _authServices: AuthService,
    private _doctorScheduleService: DoctorScheduleService,
    private _uiService: UIService,
    private _mappingService: MappingService,
    private datePipe: DatePipe,
    private _zone: NgZone
  ) {
    this.user = this._authServices.getUser();

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.docId = id;
    }
    else {
      this.docId = this.user.id;
    }


    let min = new Date().getFullYear();
    let max = min + 9;

    for (let index = min; index <= max; index++) {
      this.years.push(index);
    }


    this.currentDate = new Date();
    this.month = this.currentDate.getMonth();
    this.year = this.currentDate.getFullYear();
    // this.getState();
    this._doctorScheduleService.invokeEvent.subscribe(value => {
      if (value === 'refresh') {
        this.today();
      }
    });

    // let data = this.viewDate;
    this.appData.subscribe((data) => {
      console.log('New data', data);

      this.sch.year = this.viewDate.getFullYear();
      this.sch.monthId = this.viewDate.getMonth();
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

  onMonthYearFocusOut() {
    console.log("onMonthYearFocusOut");
    if ((this.sch.year) && (this.sch.monthId || this.sch.monthId == 0)) {

      console.log("sch.year", this.sch.year);
      console.log("viewDate.getFullYear()", this.viewDate.getFullYear());
      console.log("sch.monthId", this.sch.monthId);
      console.log("viewDate.getMonth()", this.viewDate.getMonth());

      let yearDiff = this.sch.year - this.viewDate.getFullYear();
      console.log("yearDiff", yearDiff);

      let monthDiff = this.sch.monthId - this.viewDate.getMonth();
      console.log("monthDiff", monthDiff);

      if (yearDiff > 0 || yearDiff < 0) {
        console.log("check 1");
        // if (yearDiff < 0) {
        //   yearDiff = yearDiff * (-1);
        // }
        // this.changeDate(addPeriod(this.view, this.viewDate, 1));
        this.changeDate(addPeriod(this.view, this.viewDate, yearDiff * 12));
      }
      else if (monthDiff > 0 || monthDiff < 0) {
        console.log("check 2");
        // if (monthDiff < 0) {
        //   monthDiff = monthDiff * (-1);
        // }
        // this.changeDate(addPeriod(this.view, this.viewDate, 1));
        this.changeDate(addPeriod(this.view, this.viewDate, monthDiff));
      }
      // this.changeDate(addPeriod(this.view, this.viewDate, 1));
      // this.changeDate(this.viewDate);
      // this.dateOrViewChanged();

      this.getDocSchedule(this.docId);
    }

  }

  increment(): void {
    console.log("increment");
    this.changeDate(addPeriod(this.view, this.viewDate, 1));

    console.log("month ", (this.viewDate.getMonth() + 1));
    console.log("year ", this.viewDate.getFullYear());

    this.appData.next(this.viewDate);

    this.getDocSchedule(this.docId);
    // this.getSchedule(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1))
    // this.getOffDays(this.viewDate.getFullYear(), this.viewDate.getMonth());
    // this.getHolidays(this.viewDate.getFullYear());

  }

  decrement(): void {
    console.log("decrement");
    this.changeDate(subPeriod(this.view, this.viewDate, 1));

    console.log("month ", (this.viewDate.getMonth() + 1));
    console.log("year ", this.viewDate.getFullYear());
    this.appData.next(this.viewDate);

    this.getDocSchedule(this.docId);
    // this.getSchedule(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1))
    // this.getOffDays(this.viewDate.getFullYear(), this.viewDate.getMonth());
    // this.getHolidays(this.viewDate.getFullYear());
  }

  today(): void {
    console.log("today");
    //  this.changeDate(new Date());

    this.getDocSchedule(this.docId);
    // this.getSchedule(this.viewDate.getFullYear(), (this.viewDate.getMonth() + 1))
    // this.getOffDays(this.viewDate.getFullYear(), this.viewDate.getMonth());
    // this.getHolidays(this.viewDate.getFullYear());
  }

  dateIsValid(date: Date): boolean {
    console.log("dateIsValid");

    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    console.log("changeDate");
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    console.log("changeView");
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    console.log("dateOrViewChanged");

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
    console.log("getTimezone");
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
    console.log("dayClicked");

    let msg = new Message();
    console.log("day", day);




    if (this.user.role.roleCode == "patient") {

      if (this.schedule.id) {
        const date = this.datePipe.transform(day.date, 'yyyy-MM-dd');

        // const sd = this.schedule.scheduleDetails.filter(sd => new Date(sd.scheduleDate) == day.date);
        const sd = this.schedule.scheduleDetails.filter(sd => sd.scheduleDate == date);
        console.log("sd ", sd);

        if (sd.length > 0) {

          if (sd[0].isOffDay) {

            msg.msg = "Off Day."
            // msg.title=""
            // msg.iconType=""
            this._uiService.showToast(msg, "");

          }
          else {

            if (sd[0].scheduleShifts.length == 0) {
              msg.msg = "No Shift Found."
              // msg.title=""
              // msg.iconType=""
              this._uiService.showToast(msg, "");
            }
            else {
              let dialog = this.dialog.open(AppointmentDialogeComponent, {
                // maxWidth: "700px",
                // minWidth: "550px",
                width: "550px",
                height: '465px',
                // data: this.id,
                data: {
                  docId: this.docId,
                  schedule: this.schedule,
                  scheduleDetail: sd[0],
                },
              });
              dialog.afterClosed().subscribe((result) => {
                console.log("result", result);
                if (result) {
                  // this.refreshList();
                }
              });
            }

          }

        }
        else {

          msg.msg = "No Schedule Found."
          // msg.title=""
          // msg.iconType=""
          this._uiService.showToast(msg, "");
        }
      }
      else {
        msg.msg = "No Schedule Found."
        // msg.title=""
        // msg.iconType=""
        this._uiService.showToast(msg, "");
      }



    }


    // var date = day.date.getDate().toString();
    // var month = (day.date.getMonth() + 1).toString();
    // var year = day.date.getFullYear();

    // if (date.length < 2) {
    //   date = '0' + date
    // }
    // if (month.length < 2) {
    //   month = '0' + month
    // }

    // day.cssClass  = 'css-spiner';

    // this.getDocSchedule(this.docId);
    // this.getScheduleDay(year, month, date);


  }

  getScheduleDay(currentyear, currentmonth, currentday) {
    console.log("getScheduleDay");

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
    console.log("getDocSchedule");
    console.log("month ", (this.viewDate.getMonth() + 1));
    console.log("year ", this.viewDate.getFullYear());

    this.LoadingPageload = 'block';
    this.calenderView = 'none';
    this.isSubmmited = true;
    // this._doctorScheduleService.getDocSchedule(docId, this.user.id, this.month, this.year).subscribe(
    this._doctorScheduleService.getDocSchedule(docId, this.user.id, this.viewDate.getMonth(), this.viewDate.getFullYear()).subscribe(
      (response) => {
        this.isSubmmited = false;

        // console.log("schedule res", response);
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
        this.isSubmmited = false;
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
    console.log("refreshView");
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
    console.log("hourSegmentClicked");

    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeDayViewRender(dayView: DayViewHour[]) {
    console.log("beforeDayViewRender");
    this.dayView = dayView;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    console.log("addSelectedDayViewClass");
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

