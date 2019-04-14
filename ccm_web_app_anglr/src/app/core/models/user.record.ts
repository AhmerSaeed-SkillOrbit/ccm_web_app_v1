import { BaseModel } from './base.model';


export class ActiveMedication {

    id: number;
    activeMedicationId: number;
    medicineName: string;
    dose: string;
    direction: string;
    startDate: string;
    startBy: string;
    whyComments: string;
    isActive: boolean;
}

export class AllergyMedication {

    id: number;
    allergyMedicationId: number;
    medicineName: string;
    reaction: string;
    dateOccured: string;
    isReactionSevere: boolean;
    isActive: boolean;
}

export class AllergyNonMedication {

    id: number;
    allergyNonMedicationId: number;
    substanceName: string;
    reaction: string;
    dateOccured: string;
    isReactionSevere: boolean;
    isActive: boolean;
}

export class Vaccine {

    id: number;
    vaccineId: number;
    vaccineName: string;
    vaccineDate: string;
    isActive: boolean;
}


export class PersonalContactInfo {

    id: number;
    personalContactInfoId: number;

    ableToMessage: boolean = false;
    ableToCall: boolean = false;

    feasibleMessageTime: string;
    feasibleMessageTimeFrom: string;
    feasibleMessageTimeTo: string;

    feasibleCallTime: string;
    feasibleCallTimeFrom: string;
    feasibleCallTimeTo: string;

    dayTimePhoneNumber: string;
    canCallOnDayTimePhone: boolean = false;
    canMsgOnDayTimePhone: boolean = false;

    nightTimePhoneNumber: string;
    canCallOnNightTimePhone: boolean = false;
    canMsgOnNightTimePhone: boolean = false;

    isInternetAvailable: boolean = false;
    isInternetHelper: boolean = false;
    canUseInternet: boolean = false;

    // wantToChange: boolean = false;
    // effortToChange: boolean = false;
    wantToChange: string;    // "yes", "no"
    effortToChange: string;  // "yes", "no"


    isActive: boolean = true;
}

export class AlternateContactInfo {

    id: number;
    alternateContactInfoId: number;

    careGiverName: string;
    careGiverPhoneNumber: string;
    emergencyContactName: string;
    emergencyContactPhoneNumber: string;
    financerName: string;
    financerPhoneNumber: string;
    healthCarerName: string;
    healthCarerPhoneNumber: string;
    comment: string;

    isActive: boolean = true;
}

export class InsuranceInfo {

    id: number;
    insuranceInfoId: number;

    insuranceType: string;
    insuranceOtherType: string;
    insurancePolicyNumber: string;

    coverageType: string;
    coverageOtherType: string;
    coveragePolicyNumber: string;

    comment: string;

    isActive: boolean = true;
}

export class InsuranceType {

    id: number;
    insuranceTypeId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class InsuranceCoverageType {

    id: number;
    insuranceCoverageTypeId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class SelfAssessmentInfo {

    id: number;
    selfAssessmentInfoId: number;

    liveType: string;
    liveOtherType: string;
    liveComment: string;

    challengeWith: string;
    challengeOtherType: string;
    challengeComment: string;

    primaryLanguage: string;
    primaryLanguageOther: string;
    primaryLanguageComment: string;

    learnBestBy: string;
    learnBestByOther: string;
    learnBestByComment: string;

    thingImpactHealth: string;
    thingImpactHealthOther: string;
    thingImpactHealthComment: string;

    isDietaryRequire: boolean = false;
    dietaryRequireDescription: string;

    assistanceAvailable: string;

    isActive: boolean = true;
}

export class LiveType {

    id: number;
    liveTypeId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class ChallengeType {

    id: number;
    challengeTypeId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class PrimaryLanguage {

    id: number;
    primaryLanguageId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class LearnBestBy {

    id: number;
    learnBestById: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class ThingImpactHealth {

    id: number;
    thingImpactHealthId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class AssistanceAvailable {

    id: number;
    assistanceAvailableId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export class AbilityConcernInfo {

    id: number;
    abilityConcernId: number;

    manageChronicCondition: boolean = false;
    manageChronicConditionComment: string;
    decreaseEnergyLevel: boolean = false;
    decreaseEnergyLevelComment: string;
    canCleanHome: boolean = false;
    canCleanHomeComment: string;
    emotionalCurrentIssue: boolean = false;
    emotionalCurrentIssueComment: string;
    manageMedication: boolean = false;
    manageMedicationComment: string;
    obtainHealthyFood: boolean = false;
    obtainHealthyFoodComment: string;
    copeLifeIssue: boolean = false;
    copeLifeIssueComment: string;
    isCurrentlyDnr: boolean = false;
    currentlyDnrComment: string;
    isCurrentlyPoa: boolean = false;
    currentlyPoaComment: string;
    isCurrentlyDirective: boolean = false;
    currentlyDirectiveComment: string;
    isAbleToMoveDaily: boolean = false;
    ableToMoveDailyComment: string;
    concernDetailComment: string;

    isActive: boolean = true;
}

export class ResourceInfo {

    id: number;
    resourceInfoId: number;

    isForgetMedicine: boolean = false;
    isForgetMedicineComment: string;
    isForgetAppointment: boolean = false;
    isForgetAppointmentComment: string;
    isGoWhenSick: boolean = false;
    isGoWhenSickComment: string;
    goWithoutFood: boolean = false;
    goWithoutFoodComment: string;
    isPowerShutOff: boolean = false;
    isPowerShutOffComment: string;
    getUnAbleToDress: boolean = false;
    getUnAbleToDressComment: string;
    hardToPrepareFood: boolean = false;
    hardToPrepareFoodComment: string;
    isFrequentlySad: boolean = false;
    isFrequentlySadComment: string;
    hardToTakeBath: boolean = false;
    hardToTakeBathComment: string;

    isActive: boolean = true;
}

export class QuestionAnswer {

    id: number;
    questionId: number;
    question: string;
    type: string;

    answer: Answer = new Answer();

    isActive: boolean = true;
}

export class Answer {

    id: number;
    answerId: number;
    ccmQuestionId: number;

    isAnswered: boolean = false;
    answer: string;

    isActive: boolean = true;
}

export class AnswerType {

    id: number;
    answerTypeId: number;
    name: string;
    code: string;

    createdBy: string;
    // createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}


export class PreventiveScreen {

    id: number;
    preventiveScreenId: number;
    name: string;
    description: string;

    answer: PreventiveScreenAnswer = new PreventiveScreenAnswer();

    isActive: boolean = true;
}

export class PreventiveScreenAnswer {

    id: number;
    preventiveScreenAnswerId: number;
    preventiveScreenId: number;

    isPatientExamined: boolean = false;
    description: string;

    isActive: boolean = true;
}

export class DiabeteSupplement {

    id: number;
    diabeteSupplementId: number;
    name: string;
    description: string;

    answer: DiabeteSupplementAnswer = new DiabeteSupplementAnswer();

    isActive: boolean = true;
}

export class DiabeteSupplementAnswer {

    id: number;
    diabeteSupplementAnswerId: number;
    DiabeteSupplementId: number;

    isPatientMeasure: boolean = false;
    description: string;

    isActive: boolean = true;
}


export class PsychologicalReview {

    id: number;
    psychologicalReviewId: number;
    name: string;
    description: string;

    answer: PsychologicalReviewAnswer = new PsychologicalReviewAnswer();

    isActive: boolean = true;
}

export class PsychologicalReviewAnswer {

    id: number;
    psychologicalReviewAnswerId: number;
    psychologicalReviewId: number;

    isPatientExamined: boolean = false;
    description: string;

    isActive: boolean = true;
}

export class FunctionalReview {

    id: number;
    functionalReviewId: number;
    name: string;
    description: string;

    answer: FunctionalReviewAnswer = new FunctionalReviewAnswer();

    isActive: boolean = true;
}

export class FunctionalReviewAnswer {

    id: number;
    functionalReviewAnswerId: number;
    functionalReviewId: number;

    isOkay: boolean = false;
    description: string;

    isActive: boolean = true;
}

export class SocialReview {

    id: number;
    socialReviewId: number;
    name: string;
    description: string;

    answer: SocialReviewAnswer = new SocialReviewAnswer();

    isActive: boolean = true;
}

export class SocialReviewAnswer {

    id: number;
    socialReviewAnswerId: number;
    socialReviewId: number;

    isPatientExamined: boolean = false;
    description: string;

    isActive: boolean = true;
}

export class HealthCareHistory {

    id: number;
    healthCareHistoryId: number;
    provider: string;
    lastVisitDate: string;
    visitReason: string;
    isActive: boolean = true;
}

export class HospitalizationHistory {

    id: number;
    hospitalizationHistoryId: number;
    hospitalName: string;
    hospitalizedDate: string;
    isHospitalized: string;
    patientComments: string;
    isActive: boolean = true;
}

export class SurgeryHistory {

    id: number;
    surgeryHistoryId: number;
    diagnoseDescription: string;
    diagnoseDate: string;
    needAttention: string;
    currentProblem: string;
    isActive: boolean = true;
}