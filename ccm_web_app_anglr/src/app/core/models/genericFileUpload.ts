import { Role } from "./role";
import { User } from "./user";

export class GenericFileUpload {

    id: number;
    fileUploadId: number;
    fileUploadOriginalName: string;
    fileUploadName: string;
    fileUploadExtension: string;
    fileUploadUrl: string;
    fileUploadBelongTo: string;
    fileUploadType: string;
    fileUploadTypeId: number;
    selected: boolean;
    fileUploadCode: string;
    fileUploadDescription: string;
    fileUploadTooltip: string;
    fileUploadPurpose: string;
    value: string;

    role: Role = new Role();
    createdBy: User = new User();
    createdOn: number;

}
