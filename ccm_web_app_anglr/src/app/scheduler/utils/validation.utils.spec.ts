import { TestBed, async } from '@angular/core/testing';
import { ValidationUtils } from './validation.utils';

fdescribe('Validation Utils ', () => {
    
    let samePrioritiesAndSameStart = [{ "IsDeleted":false,
                "Priority":1,
                "SpecialistId":1,
                "firstName":"Karim","lastName":"Sajjad",
                "UtcDSTOffsetInSeconds":-28800,
                "utcDSTOffsetInSeconds":-28800,
                "displayStartTime": { hour: "10", minute: "00"},//"10:00",
                "displayStartTimeInUTC":"18:00",
                "displayStartTimeInLocal":"23:00",
                "displayStartDate":"2018-2-10",
                "displayStartDateInUTC":"2018-02-10",
                "displayStartDateInLocal":"2018-02-10",
                "Id":0,
                "Shift":2,
                "ShiftEndtime":"2018-02-10T22:00:00" },
                { "IsDeleted":false,"Priority":1,"SpecialistId":77,"firstName":"Hasan","lastName":"Raza",
                "UtcDSTOffsetInSeconds":-28800,
                "utcDSTOffsetInSeconds":-28800,"displayStartTime":{ hour: "10", minute: "00"},
                "displayStartTimeInUTC":"18:00","displayStartTimeInLocal":"23:00",
                "displayStartDate":"2018-2-10","displayStartDateInUTC":"2018-02-10",
                "displayStartDateInLocal":"2018-02-10","Id":0,"Shift":2,
                "ShiftEndtime":"2018-02-10T22:00:00" }];


    let samePrioritiesButDifferentShifts = [{ "IsDeleted":false,
                                            "Priority":1,
                                            "SpecialistId":1,
                                            "firstName":"Karim",
                                            "lastName":"Sajjad",
                                            "UtcDSTOffsetInSeconds":-28800,
                                            "utcDSTOffsetInSeconds":-28800,
                                            "displayStartTime":{ hour: "10", minute: "00"},
                                            "displayStartTimeInUTC":"18:00",
                                            "displayStartTimeInLocal":"23:00",
                                            "displayStartDate":"2018-2-10",
                                            "displayStartDateInUTC":"2018-02-10",
                                            "displayStartDateInLocal":"2018-02-10",
                                            "Id":0,
                                            "Shift":2,
                                            "ShiftEndtime":"2018-02-10T22:00:00"
                                        },
                                        {   "IsDeleted":false,"Priority":1,
                                            "SpecialistId":77,"firstName":"Hasan",
                                            "lastName":"Raza","UtcDSTOffsetInSeconds":-28800,
                                            "utcDSTOffsetInSeconds":-28800,
                                            "displayStartTime":{ hour: "10", minute: "00"},
                                            "displayStartTimeInUTC":"18:00",
                                            "displayStartTimeInLocal":"23:00",
                                            "displayStartDate":"2018-2-10",
                                            "displayStartDateInUTC":"2018-02-10",
                                            "displayStartDateInLocal":"2018-02-10","Id":0,
                                            "Shift":3,"ShiftEndtime":"2018-02-10T20:00:00"}]

    
    let differentPrioritiesAndSameShift = [{"IsDeleted":false,
                                            "Priority":1,
                                            "SpecialistId":1,
                                            "firstName":"Karim","lastName":"Sajjad",
                                            "UtcDSTOffsetInSeconds":-28800,
                                            "utcDSTOffsetInSeconds":-28800,
                                            "displayStartTime":{ hour: "10", minute: "00"},
                                            "displayStartTimeInUTC":"18:00",
                                            "displayStartTimeInLocal":"23:00",
                                            "displayStartDate":"2018-2-18",
                                            "displayStartDateInUTC":"2018-02-18",
                                            "displayStartDateInLocal":"2018-02-18",
                                            "Id":0,
                                            "Shift":2,
                                            "ShiftEndtime":"2018-02-18T22:00:00"
                                        },
                                        {   "IsDeleted":false,"Priority":2,
                                            "SpecialistId":77,
                                            "firstName":"Hasan","lastName":"Raza",
                                            "UtcDSTOffsetInSeconds":-28800,
                                            "utcDSTOffsetInSeconds":-28800,
                                            "displayStartTime":{ hour: "10", minute: "00"},
                                            "displayStartTimeInUTC":"18:00",
                                            "displayStartTimeInLocal":"23:00",
                                            "displayStartDate":"2018-2-18",
                                            "displayStartDateInUTC":"2018-02-18",
                                            "displayStartDateInLocal":"2018-02-18",
                                            "Id":0,
                                            "Shift":2,
                                            "ShiftEndtime":"2018-02-18T22:00:00" }]  

    let samePrioritiesDifferentStartTimeAndSameShift =
                                         [{"IsDeleted":false,
                                            "Priority":1,
                                            "SpecialistId":1,
                                            "firstName":"Karim","lastName":"Sajjad",
                                            "UtcDSTOffsetInSeconds":-28800,
                                            "utcDSTOffsetInSeconds":-28800,
                                            "displayStartTime":{ hour: "10", minute: "00"},
                                            "displayStartTimeInUTC":"18:00",
                                            "displayStartTimeInLocal":"23:00",
                                            "displayStartDate":"2018-2-18",
                                            "displayStartDateInUTC":"2018-02-18",
                                            "displayStartDateInLocal":"2018-02-18",
                                            "Id":0,
                                            "Shift":2,
                                            "ShiftEndtime":"2018-02-18T22:00:00"
                                        },
                                        {   "IsDeleted":false,"Priority":1,
                                            "SpecialistId":77,
                                            "firstName":"Hasan","lastName":"Raza",
                                            "UtcDSTOffsetInSeconds":-28800,
                                            "utcDSTOffsetInSeconds":-28800,
                                            "displayStartTime":{ hour: "09", minute: "00"},
                                            "displayStartTimeInUTC":"18:00",
                                            "displayStartTimeInLocal":"23:00",
                                            "displayStartDate":"2018-2-18",
                                            "displayStartDateInUTC":"2018-02-18",
                                            "displayStartDateInLocal":"2018-02-18",
                                            "Id":0,
                                            "Shift":2,
                                            "ShiftEndtime":"2018-02-18T22:00:00" }] 
                                                                                      
    fit('should be shift on same but same priorities ', () => {
        let validationUtils = new ValidationUtils;
        let isValid = validationUtils.verifyGivenData(samePrioritiesAndSameStart);
        expect(false).toBe(isValid);
    });

    fit('should be different shift and same priorities', () => {
        let validationUtils = new ValidationUtils;
        let isValid = validationUtils.verifyGivenData(samePrioritiesButDifferentShifts)
        expect(true).toBe(isValid)
    });

    fit('should be different priorities and same shift', () => {
        let validationUtils = new ValidationUtils;
        let isValid = validationUtils.verifyGivenData(differentPrioritiesAndSameShift)
        expect(true).toBe(isValid)
    })

    fit('should be same priorities and same shift but different start time', () => {
        let validationUtils = new ValidationUtils;
        let isValid = validationUtils.verifyGivenData(samePrioritiesDifferentStartTimeAndSameShift)
        expect(true).toBe(isValid)
    })
});