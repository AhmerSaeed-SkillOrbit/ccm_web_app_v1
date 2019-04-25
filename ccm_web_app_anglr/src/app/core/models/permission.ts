import { BaseModel } from './base.model';

export class Permission {

    id: number;
    permissionId: number;
    permissionName: string;
    selected: boolean;
    permissionCode: string;
    permissionType: string;
    description: string;
    tooltip: string;
    accessUrl: string;
    value: string;
    sortOrder: number;

    isActive: boolean = true;

}
