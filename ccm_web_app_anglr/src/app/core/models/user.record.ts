import { BaseModel } from './base.model';


export class ActiveMedication {

    id: number;
    activeMedicationId: number;
    medicineName: string;
    dose: string;
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
