import { User } from "./user";

// import { BaseModel } from "./base.model";

// export class CcmPlan extends BaseModel {
export class CcmPlan {

    id: number;
    ccmPlanId: number;
    planNumber: string;
    startDate: string;
    endDate: string;
    items: CcmPlanItem[] = [];

    isHealthParam: boolean = false;
    healthParams: CcmPlanHealthParam[] = [];

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;

    isActive: boolean = true;

}

export class CcmPlanWithReview {

    id: number;
    ccmPlanId: number;
    planNumber: string;
    startDate: string;
    endDate: string;
    items: CcmPlanItem[] = [];

    isHealthParam: boolean = false;
    healthParams: CcmPlanHealthParam[] = [];

    ccmPlanReviews: CcmPlanReview[] = [];

    // createdBy: number;
    createdBy: User = new User();
    createdOn: string;
    updatedBy: string;
    updatedOn: string;

    isActive: boolean = true;

}

export class CcmPlanItem {

    id: number;
    ccmPlanItemId: number;
    name: string;

    itemGoals: CcmPlanItemGoal[] = [];

    ccmPlanReviews: CcmPlanReview[] = [];

    isActive: boolean = true;
}


export class CcmPlanItemGoal {

    id: number;
    ccmPlanItemGoalId: number;
    goalNumber: string;
    goal: string;
    intervention: string;
    result: string;
    patientComment: string;
    reviewerComment: string;
    reviewDate: string;

    ccmPlanReviews: CcmPlanReview[] = [];

    isActive: boolean = true;
}

export class CcmPlanHealthParam {

    id: number;
    ccmPlanHealthParamId: number;
    readingValue: string;
    readingDate: string;

    healthParamId: number;
    healthParam: HealthParam = new HealthParam();

    isActive: boolean = true;
}

export class HealthParam {

    id: number;
    healthParamId: number;
    name: string;
    description: string;

    isActive: boolean = true;
}

export class CcmPlanReview {

    id: number;
    ccmPlanReviewId: number;
    barrier: string;
    reviewDate: string;
    reviewerComment: string;

    ccmPlanId: number;
    ccmPlan: CcmPlan = new CcmPlan();
    ccmPlanItemName: string;
    ccmPlanItem: CcmPlanItem = new CcmPlanItem();
    ccmPlanItemGoalId: number;
    ccmPlanItemGoal: CcmPlanItemGoal = new CcmPlanItemGoal();


    isGoalAchieve: boolean = false;
    isActive: boolean = true;
}