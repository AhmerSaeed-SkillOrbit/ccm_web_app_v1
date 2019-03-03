import { Injectable, OnDestroy } from "@angular/core";


@Injectable()
export class DateTimeUtils
{
    constructor() {}

    trimToTime(fullTime)
    {
        let index = fullTime.indexOf('T');
        let time = fullTime.substring(index + 1);
        return time;
    }

    trimToDate(fullDate)
    {
        let index = fullDate.indexOf('T');
        let date = fullDate.substring(0, index)
        return date;
    }

    getTimeInObject(event)
    {
        let split = event.split(':');
        return { hour: split[0], minute: split[1] }
    }

    convertToLocal(event)
    {
        let strDate = event.date + ' ' + event.time + ' UTC';
        let d2 = new Date(strDate.replace(/-/g, "/"));
        
        var hours = d2.getHours().toString();
        var mins = d2.getMinutes().toString();
        var month = (d2.getMonth() + 1).toString()
        var date = d2.getDate().toString();

        hours = this.appendZero(hours);
        mins = this.appendZero(mins);
        month = this.appendZero(month);
        date = this.appendZero(date);
        
        let conversion = {
            time: hours + ':' + mins,
            date: d2.getFullYear() + '-' + month + '-' + date
        }
        return conversion;
    }

    convertToUTC(getDate, event, utcOffset)
    {
        let strDate = getDate + ' ' + event;
        let d2 = new Date(strDate.replace(/-/g, "/"));

        let utc = parseInt(utcOffset);
        
        d2.setHours( d2.getHours() - (utc/3600) );
        var hours = d2.getHours().toString();
        var mins = d2.getMinutes().toString();
        var month = (d2.getMonth() + 1).toString()
        var date = d2.getDate().toString();

        hours = this.appendZero(hours);
        mins = this.appendZero(mins);
        month = this.appendZero(month);
        date = this.appendZero(date);
        

        let conversion = {
            time: hours + ':' + mins,
            date: d2.getFullYear() + '-' + month + '-' + date
        }
        return conversion;
    }

    convertToSpecifiedUTCOffset(getDate, event, utcOffset)
    {
        let strDate = getDate + ' ' + event;
        let d2 = new Date(strDate.replace(/-/g, "/"))

        let utc = parseInt(utcOffset);
        
        d2.setHours( d2.getHours() + (utc/3600) );
        var hours = d2.getHours().toString();
        var mins = d2.getMinutes().toString();
        var month = (d2.getMonth() + 1).toString()
        var date = d2.getDate().toString();

        hours = this.appendZero(hours);
        mins = this.appendZero(mins);
        month = this.appendZero(month);
        date = this.appendZero(date);
        

        let conversion = {
            time: hours + ':' + mins,
            date: d2.getFullYear() + '-' + month + '-' + date
        }
        return conversion;
    }

    convertTimeToDate(timeZone, selectedValue)
    {
        //Convert to Date. "FORMAT EX. 2018-12-01T00:00:00"
        // if(timeZone == 'UTC')
        // {
          
            // return shiftStart;
        // }
        
        // else{
            let obj = selectedValue.displayStartTime;
            let time = this.appendZero(obj.hour) + ':' + this.appendZero(obj.minute);
            let shiftStart = selectedValue.displayStartDate  + "T" + time;
             return shiftStart;
            
        // }
        // let shift;
        // shift[0] = shiftStartUTC,
        // shift[1] = shiftStart
        
        // return shift;
    }

    convertTimeToDateUTC(timeZone, selectedValue)
    {
        let objUTC = selectedValue.displayStartTimeInUTC;
        let timeUTC = this.appendZero(objUTC.hour) + ':' + this.appendZero(objUTC.minute);
        let shiftStartUTC = selectedValue.displayStartDateInUTC + "T" + timeUTC;
        return shiftStartUTC;
    }
    createEndTime(getDate, shifts, v, startTime)
    {
        let startTimeInStr = this.appendZero(startTime.hour) + ':' + this.appendZero(startTime.minute);
        let shift = shifts.filter(s => s.id == v);
        let singleShift = shift[0];
        let date = getDate + ' ' + startTimeInStr;
        let endDate = new Date(date.replace(/-/g, "/"));
        
        endDate.setHours(endDate.getHours() + parseInt(singleShift.durationInHours));      
        var hours = endDate.getHours().toString()
        var minutes = endDate.getMinutes().toString();
        let month =  endDate.getMonth() + 1;
        let newDate = endDate.getDate();
        hours = this.appendZero(hours);
        minutes = this.appendZero(minutes);
        month = this.appendZero(month);
        newDate = this.appendZero(newDate);

        let endTime = endDate.getFullYear()+'-'+month
                            +'-'+newDate+'T'+hours+':'+minutes+':00';
        return endTime;
    }

    getLocalUTC(date, event)
    {
        let local = new Date((date + ' ' + event).replace(/-/g, "/"))
        // let local = new Date(date + ' ' + event);
        
        var hours = local.getUTCHours().toString();
        var mins = local.getUTCMinutes().toString();
        var month = (local.getUTCMonth() + 1).toString()
        var utcDate = local.getUTCDate().toString();

        hours = this.appendZero(hours);
        mins = this.appendZero(mins);
        month = this.appendZero(month);
        date = this.appendZero(utcDate);

        let conversion = {
            time: hours + ':' + mins,
            date: local.getUTCFullYear() + '-' + month + '-' + date
        }
        return conversion;
    }

    appendZero(data)
    {
        let str = data.toString();
        if(str.length == 1)
            return '0' + str;
        return str;
    }
}