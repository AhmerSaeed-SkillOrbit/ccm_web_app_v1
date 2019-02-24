import { BaseModel } from './base.model';

export class Permission {

    id: number;
    permissionId: number;
    permissionName: string;
    selected: boolean;
    permissionCode: string;
    permissionType: string;
    accessUrl: string;
    value: string;

}
