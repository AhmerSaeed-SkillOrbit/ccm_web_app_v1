export class Tab {

    id: number;
    tabId: number;
    name: string;
    code: string;
    toolTip: string;
    description: string;
    sortOrder: number;
    createdBy: number;
    updatedBy: number;
    createdOn: string;
    updatedOn: string;
    isPublish: boolean = false;
    isActive: boolean = true;
    isSelected: boolean;
}