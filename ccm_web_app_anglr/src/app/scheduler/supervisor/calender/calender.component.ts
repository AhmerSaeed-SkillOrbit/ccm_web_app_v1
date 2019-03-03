
import {
  Component,
  ViewEncapsulation,
  Output, EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { ScheduleService } from '../../../core/services/schedule/schedule.service';
import { CalendarEvent, 
    CalendarMonthViewDay, 
    CalendarEventTitleFormatter,
    CalendarEventTimesChangedEvent } from 'angular-calendar';
import { DayViewHour, EventColor } from 'calendar-utils';
import { Subject } from 'rxjs/Subject';

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

@Component({
  selector: 'supervisor-calander-component',
  templateUrl: 'calender.component.html',
  // don't do this in your app, its only so the styles get applied globally
  styleUrls : ['calender.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // providers: [
  //   {
  //     provide: CalendarEventTitleFormatter,
  //     useClass: CustomEventTitleFormatter
  //   }
  // ]
})
export class SupervisorCalenderComponent implements OnInit {
    view: CalendarPeriod = 'month';

    viewDate: Date = new Date();

    clickedDates;

    @Output() dateEvent = new EventEmitter();

    holidays = [];

    selectedDayViewDate: Date;

    dayView: DayViewHour[];

    colors: any = {
      red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
      },
      veemed: {
        primary: '#00aecc',
        secondary: '#dbf5f9'
      }
    };

    events: CalendarEvent[] = [];

    minDate: Date = addMonths(new Date(), -12);
  
    maxDate: Date = addMonths(new Date(), 12);
  
    prevBtnDisabled: boolean = false;
  
    nextBtnDisabled: boolean = false;

    refresh: Subject<any> = new Subject();

    specialistID: string;

    partnerSiteID: string;

    details = []

    hiddenCalendar = true;
    hiddenLoader = true;
  

    constructor(private schedule: ScheduleService,
                private ref:ChangeDetectorRef) {
      this.dateOrViewChanged();
    }
    increment(): void {
      this.changeDate(addPeriod(this.view, this.viewDate, 1));
      this.hiddenCalendar = true
      this.hiddenLoader = false
      this.masterMonthSchedule();
    }
  
    decrement(): void {
      this.changeDate(subPeriod(this.view, this.viewDate, 1));
      this.hiddenCalendar = true
      this.hiddenLoader = false
      this.masterMonthSchedule();
    }
  
    today(): void {
      this.changeDate(new Date());
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
  
  dayClicked(day: CalendarMonthViewDay): void {

    this.clickedDates = {
      day: day.date.getDay(),
      date: day.date.getDate(),
      year: day.date.getFullYear(),
      month: day.date.getMonth()
    }
    this.dateEvent.emit(this.clickedDates);
  }

  ngOnInit()
  {
    
  }
  
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        
        if(!this.partnerSiteID)
          return;
        if(!this.specialistID)
          return;  
        
        let middle = Math.floor(body.length / 2);
        let year  =  body[middle].date.getFullYear();
        let month = body[middle].date.getMonth() + 1;
        
        this.schedule.getHolidays(year).subscribe(
          response => {
                this.holidays = JSON.parse(response._body);
                body.map(b => b.cssClass = 
                  this.holidays
                    .filter(
                      h => new Date(b.date).toString() == new Date(h.offDay).toString()).length > 0 
                            ? 'cal-day-selected' : '' );
          },
          error => {});
          
  }

  
  refreshView(pId, sId): void {
    if(!sId && !pId)
    {
      this.masterMonthSchedule();
      return;
    }    
    this.specialistID = sId;
    this.partnerSiteID = pId;
    this.masterMonthSchedule()
  }

  private masterMonthSchedule()
  {
    this.hiddenCalendar = true
    this.hiddenLoader = false;
    this.ref.detectChanges()

    let data = {
        year: this.viewDate.getFullYear(), 
        month: this.viewDate.getMonth() + 1, 
        specialistID:this.specialistID, 
        partnerSiteID: this.partnerSiteID
    }
    this.schedule.getSupervisorScheduleMonth(data).subscribe(
      (response) => {
        let monthScheduled = JSON.parse(response._body)
        
        if(!monthScheduled)
          monthScheduled = []

        this.events = [];
        let color: EventColor = this.colors.veemed
        monthScheduled.forEach(m => {
          let event = {
            start: this.resetTimeInDate(new Date(m.startTimeInUTC)),
            end: this.resetTimeInDate(new Date(m.startTimeInUTC)),
            title: 'To be provided',
            color: color,
            details: m
          }
          this.events.push(event);
        });
        this.hiddenCalendar = false
        this.hiddenLoader = true
        this.refresh.next();
      },
      (error) => {}
    );
  }

  private resetTimeInDate(date)
  {
    date.setHours(0,0,0,0);
    return date;
  }
}



