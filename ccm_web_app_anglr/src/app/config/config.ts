export const Config = {
    pattern: {
        email: {
            regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            tooltip: 'Pattern e.g "example@test.com"',
            maxLength: 50
        },
        sapId: {
            // regex: /^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9])+$/,
            // regex: /^([a-zA-Z0-9])+$/,
            // tooltip: 'Pattern e.g "AAaa11122"'
            regex: null,
            tooltip: null,
            maxLength: 50
        },
        password: {
            regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,20}$/,
            tooltip: 'Password should be min 8 digit , max 20 digit and combination of alphanumberic and specified special characters (!@#$%^&*_+) with 1 uppercase letter, 1 lowercase letter and  1 numeric character'
        },
        suitNo: {
            // regex: /^[A-Za-z]+-\d+\/\d{4}$/,
            // tooltip: 'Pattern e.g "ABCabc-19209/2018"'
            regex: null,
            tooltip: null,
            maxLength: 50
        },
        cnic: {
            regex: /^\(?([0-9]{5})\)?[-. ]?([0-9]{7})[-. ]?([0-9]{1})$/,
            tooltip: 'Pattern e.g "42101-1234567-7"',
            maxLength: 15
        },
        mobileNo: {
            // regex: /^\(?([0-9]{4})\)?[-. ]?([0-9]{7})$/,
            // tooltip: 'Pattern e.g "0347-1234567"',
            // maxLength: 12
            regex: null,
            tooltip: null,
            maxLength: 20
        },
        phoneNo: {
            // regex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{8})$/,
            // tooltip: 'Pattern e.g "021-12345678"',
            // maxLength: 12
            regex: null,
            tooltip: null,
            maxLength: 20
        },
        website: {
            regex: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
            tooltip: "Eg. www.t.com || http://www.t.com || https://www.t.com",
            maxLength: 100
        },
        fax: {
            regex: /^[0-9]+$/,
            tooltip: 'Accept only number 0-9',
            maxLength: 50
        },
        cif: {
            regex: null,
            tooltip: null,
            maxLength: 20
        },
        fName: {
            regex: null,
            tooltip: null,
            maxLength: 100
        },
        lName: {
            regex: null,
            tooltip: null,
            maxLength: 100
        },
        defaultName: {
            regex: null,
            tooltip: null,
            maxLength: 100
        },
        firmName: {
            regex: null,
            tooltip: null,
            maxLength: 50
        },
        firmCode: {
            regex: null,
            tooltip: null,
            maxLength: 50
        },
        barLicenseOrRegistrationNo: {
            regex: null,
            tooltip: null,
            maxLength: 100
        },
        onlyAcceptNumber: {
            regex: /^[0-9]+$/,
            tooltip: 'Accept only number 0-9'
        },
        genericOne: {
            regex: null,
            tooltip: null,
            maxLength: 50
        },
        genericTwo: {
            regex: null,
            tooltip: null,
            maxLength: 100
        },
        genericThree: {
            regex: null,
            tooltip: null,
            maxLength: 500
        },
        genericFour: {
            regex: null,
            tooltip: null,
            maxLength: 1000
        },
        genericFive: {
            regex: null,
            tooltip: null,
            maxLength: 4000
        }
    },
    lawFirmSelfType: [
        {
            id: 1,
            name: "Individual",
            code: "individual",
        },
        {
            id: 2,
            name: "Company",
            code: "company",
        }
    ],
    months: [
        {
            id: 0,
            shortName: "Jan",
            longName: "January",
        },
        {
            id: 1,
            shortName: "Feb",
            longName: "February",
        },
        {
            id: 2,
            shortName: "Mar",
            longName: "March",
        },
        {
            id: 3,
            shortName: "Apr",
            longName: "April",
        },
        {
            id: 4,
            shortName: "May",
            longName: "May",
        },
        {
            id: 5,
            shortName: "Jun",
            longName: "June",
        },
        {
            id: 6,
            shortName: "Jul",
            longName: "July",
        },
        {
            id: 7,
            shortName: "Aug",
            longName: "August",
        },
        {
            id: 8,
            shortName: "Sep",
            longName: "September",
        },
        {
            id: 9,
            shortName: "Oct",
            longName: "October",
        },
        {
            id: 10,
            shortName: "Nov",
            longName: "November",
        },
        {
            id: 11,
            shortName: "Dec",
            longName: "December",
        },
    ],
    year: {
        min: 2019,
        max: 2050
    },
    noOfShifts: [
        1,
        2
    ],
    // expertises: [
    //     {
    //         id: 1,
    //         name: "Expertise 1",
    //         code: "expertise_1",
    //     },
    //     {
    //         id: 2,
    //         name: "Expertise 2",
    //         code: "expertise_3",
    //     }
    // ],
    expertise: {
        min: 1,
        max: 50
    },
    blacListEvent: {
        min: 1,
        max: 50
    },
    reference: {
        min: 2,
        max: 10
    },
    associatePartner: {
        min: 1,
        max: 50
    },
    managingPartner: {
        min: 1,
        max: 50
    },
    lawyerRecommendation: {
        min: 1,
        max: 50
    },
    director: {
        min: 1,
        max: 50
    },
    collateral: {
        min: 1,
        max: 50
    },
    collateralDetail: {
        min: 1,
        max: 50
    },
    collateralValuation: {
        min: 1,
        max: 50
    },
    settlementPaymentTerm: {
        min: 1,
        max: 50
    },
    courtCompliance: {
        min: 1,
        max: 50
    },
    externalParty: {
        min: 1,
        max: 50
    },
    internalUnion: {
        min: 1,
        max: 50
    },
    firParty: {
        min: 1,
        max: 50
    },
    finalRemarks: [
        {
            id: 1,
            name: "Fit",
            code: "fit",
        },
        {
            id: 2,
            name: "Review",
            code: "review",
        },
        {
            id: 3,
            name: "Decline",
            code: "unfit",
        }

    ],
    lawFirmPanel: [
        {
            id: 1,
            name: "Existing Panel",
            code: "existingPanel",
        },
        {
            id: 2,
            name: "Add New LawFirm",
            code: "addNewLawFirm",
        }
    ],
    endorsementListForCLC: [
        {
            id: 1,
            name: "Endorse",
            code: "endorse",
        },
        {
            id: 2,
            name: "Reject",
            code: "reject",
        }
    ],
    endorsementListForHOL: [
        {
            id: 1,
            name: "Endorse RM",
            code: "endorseRM",
        },
        {
            id: 2,
            name: "Endorse CLC",
            code: "endorseCLC",
        },
        {
            id: 3,
            name: "Reject",
            code: "reject",
        }
    ],
    milestone: {
        min: 1,
        max: 50,
        defaultMilestone: {
            id: null,
            milestoneName: "Advance Fee",
            milestoneCodeName: "advance_fee",
            milestoneParentId: null,
            value: null,
            percentage: null
        }
    },

    depositIn: [
        {
            id: 1,
            name: "Bank",
            code: "bank",
        },
        {
            id: 2,
            name: "Busssines Unit",
            code: "busssines_unit",
        }
    ],

    settlementSchedule: [
        {
            id: 1,
            name: "Weekly",
            code: "weekly",
        },
        {
            id: 2,
            name: "Monthly",
            code: "monthly",
        },
        {
            id: 3,
            name: "Quarterly",
            code: "quarterly",
        },
        {
            id: 4,
            name: "Half Yearly",
            code: "half_yearly",
        },
        {
            id: 5,
            name: "Yearly",
            code: "yearly",
        },
        {
            id: 6,
            name: "Other",
            code: "other",
        }
    ],

    settlementOption: [
        {
            id: 1,
            name: "Partial Settlement",
            code: "Partial Settlement",
        },
        {
            id: 2,
            name: "Total Settlement",
            code: "Total Settlement",
        }
    ],
    settlementType: [
        {
            id: 1,
            name: "Pre-Case File",
            code: "pre_case_file",
        },
        {
            id: 2,
            name: "Post-Case File",
            code: "post_case_file",
        }
    ],
    classificationType: [
        {
            id: 1,
            name: "Objective",
            code: "Objective",
        },
        {
            id: 2,
            name: "Subjective",
            code: "Subjective",
        }
    ],
    defaulterType: [
        {
            id: 1,
            name: "Individual",
            code: "Individual",
        },
        {
            id: 2,
            name: "Company",
            code: "Company",
        },
        {
            id: 3,
            name: "Other",
            code: "other",
        }
    ],
    productSecurity: [
        {
            id: 1,
            name: "Secured",
            code: true,
        },
        {
            id: 2,
            name: "UnSecured",
            code: false,
        }
    ],
    hearingHeldOption: [
        {
            name: 'Yes',
            code: true
        },
        {
            name: 'No',
            code: false
        }
    ],
    msg: {
        permissionPop: "Sorry, You dont have permission",
        permission: "Dont have permission"
    },

};
