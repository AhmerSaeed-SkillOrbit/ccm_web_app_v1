import { Injectable } from "@angular/core";


@Injectable()
export class ValidationUtils
{

    grouped(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    verifyGivenData(flattenChanges): boolean
    {   
        let duplicatTracer = [];
        let grouping = this.grouped(flattenChanges, 'Shift')
        for (var p in grouping) 
        {
            if(grouping.hasOwnProperty(p) ) {
                let groupedData = grouping[p];
                let filterDelete = groupedData.filter(f => f.IsDeleted == false);

                let priorities = filterDelete.map(i => parseInt(i.Priority))

                let shiftStartedTime = filterDelete.map(i => i.displayStartTime)
                let shiftStartedTimeStr = shiftStartedTime.map(i => i.hour + ':' + i.minute)
                let combined = this.combineTwoArray(priorities, shiftStartedTimeStr);

                let duplicates = this.findDuplicates(combined);
                
                if(duplicates)
                {
                    duplicatTracer.push(duplicates)
                }
            } 
        }
        if(duplicatTracer.length > 0)
        {
            return false;
        }
        return true;
    }

    findDuplicates(combined)
    {
        var isDuplicate = false;
        combined.forEach((c) => 
        {
          for(let val in c)
          {
            let array = c[val]
            let result = this.find(array)
            if(result.length > 0)
                isDuplicate = true
          }
        });
        return isDuplicate;
    }

    find(data)
    {
        let result = [];
        data.forEach(function(element, index) {
            // Find if there is a duplicate or not
            if (data.indexOf(element, index + 1) > -1) 
            { 
                // Find if the element is already in the result array or not
                if (result.indexOf(element) === -1 ) 
                {
                    result.push(element);
                }
            }
        });
        return result;
    }

    combineTwoArray(keys, values)
    {
        let object = [];
        for(let i = 0; i < keys.length; i++)
        {
            let o = { key: keys[i], value: values[i] }
            object.push(o);
        }
        let grouped = this.grouping2(object)
        let data = this.finalData(grouped);
        return data
    }

    grouping2(myArray)
    {
        return myArray.reduce(function(res, currentValue) {
            if ( res.indexOf(currentValue.key) === -1 ) {
              res.push(currentValue.key);
            }
            return res;
        }, []).map(function(key) {
            return {
                key: key,
                value: myArray.filter(function(_el) {
                  return _el.key === key;
               }).map(function(_el) { return _el.value; })
            }
        });
    }

    finalData(data)
    {
        let result = [];
        
        data.forEach((d) =>
        {
            let key = d.key
            var obj = {};
            obj[key] = d.value;
            result.push(obj)
        })
        return result
    }

    ifPassedDate(date)
    {
        let current = new Date();
        let clicked = new Date(date.year + '/' + date.month + '/' + date.date);

        let timeDiff = clicked.getTime() - current.getTime();
        let diffDays = Math.ceil(timeDiff / (1000 * 60 * 60)); 
        
        return diffDays < -24;
    }
}