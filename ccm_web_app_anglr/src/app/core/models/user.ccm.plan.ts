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

export class CcmPlanItem {

    id: number;
    ccmPlanItemId: number;
    name: string;

    itemGoals: CcmPlanItemGoal[] = [];

    isActive: boolean = true;
}


export class CcmPlanItemGoal {

    id: number;
    ccmPlanItemGoalId: number;
    goal: string;
    intervention: string;
    result: string;
    patientComment: string;
    reviewerComment: string;
    reviewDate: string;

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