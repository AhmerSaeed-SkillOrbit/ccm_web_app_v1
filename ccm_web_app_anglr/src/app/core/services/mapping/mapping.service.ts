import { Injectable, Inject } from '@angular/core';

import { User } from '../../models/user';
import { Role } from '../../models/role';
import { Document } from "../../models/document";
import { Config } from '../../../config/config';

import { UtilityService } from '../general/utility.service';
import { Country } from '../../models/country';
import { Region } from '../../models/region';
import { City } from '../../models/city';
import { Branch } from '../../models/branch';
import { Permission } from '../../models/permission';

@Injectable()
export class MappingService {

    constructor(
        private _utilityService: UtilityService,
    ) {
    }


    public mapUser(res: any): User {
        const userData = res ? res : null;
        const isUser = new User();
        if (userData) {
            isUser.id = userData.Id || null;
            isUser.userId = userData.Id || null;
            isUser.firstName = userData.FirstName || null;
            isUser.lastName = userData.LastName || null;
            isUser.email = userData.EmailAddress || null;

            isUser.officeAddress = userData.OfficeAddress || null;
            isUser.residentialAddress = userData.ResidentialAddress || null;

            isUser.mobileNumber = userData.MobileNumber || null;
            isUser.phoneNumber = userData.TelephoneNumber || null;
            isUser.cnic = userData.Cnic || null;
            isUser.age = userData.Age || null;
            isUser.ageGroup = userData.AgeGroup || null;
            // isUser.associationType = userData.AssociationType || null;
            isUser.blockReason = userData.BlockReason || null;


            isUser.password = userData.userPassword;

            isUser.country = userData.country || new Country();
            isUser.countryId = userData.country ? userData.country.id : null;

            isUser.stateId = userData.stateId;
            // isUser.state = userData.state || new State();
            // isUser.stateId = userData.state ? userData.state.id : null;

            // isUser.regionId = userData.regionId;
            isUser.region = userData.region || new Region();
            isUser.regionId = userData.region ? userData.region.id : null;

            // isUser.cityId = userData.cityId;
            isUser.city = userData.city || new City();
            isUser.cityId = userData.city ? userData.city.id : null;

            // isUser.branchId = userData.branchId;
            isUser.branch = userData.branch || new Branch();
            isUser.branchId = userData.branch ? userData.branch.id : null;

            isUser.roleCode = userData.RoleCodeName || null;
            isUser.roleName = userData.RoleName || null;
            isUser.roles = userData.roles;
            isUser.permissions = userData.permissions;

            if (userData.profilePicture) {
                isUser.profilePicture = userData.profilePicture;
                // u.resume = this._fileService.mapDocument(element.resume);
            }

            // isUser.resume = this._fileService.mapDocument(userData.resume);

            isUser.isBlocked = userData.isBlocked;
            isUser.isActive = userData.isActive || false;
            isUser.lastLogin = userData.lastLogin || null;

            isUser.createdOn = userData.createdOn || null;
            isUser.createdBy = userData.createdBy || null;
            isUser.updatedOn = userData.updatedOn || null;
            isUser.updatedBy = userData.updatedBy || null;

        }


        return isUser;
    }

    public mapRole(res: any): Role {
        const roleData = res;
        const isRole = new Role();
        if (roleData) {
            isRole.id = roleData.id || null;
            isRole.roleId = roleData.id || null;
            isRole.roleName = roleData.roleName || null;
            isRole.departmentId = roleData.departmentId || null;
        }


        return isRole;
    }
    
    public mapPermission(res: any): Permission {
        const permissionData = res;
        const isPermission = new Permission();
        if (permissionData) {
            isPermission.id = permissionData.Id || null;
            isPermission.permissionId = permissionData.Id || null;
            isPermission.permissionName = permissionData.PermissionName || null;
            isPermission.permissionCode = permissionData.PermissionCodeName || null;
        }

        return isPermission;
    }

    public mapDocument(res: any): Document {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;

        // const userData = res.json();
        // const caseData = res.json().length > 0 ? res.json()[0] : null;
        const documentData = res ? res : null;
        let isDocument = new Document();
        if (documentData) {
            isDocument.documentId = documentData.documentUploadedId || null;
            isDocument.documentOriginalName = documentData.documentOriginalName || "";
            isDocument.documentName = documentData.documentName || "";
            isDocument.documentExtension = documentData.documentExtension || "";
            isDocument.documentUrl = documentData.documentUrl || "";
            // isDocument.documentType = documentData.observationBelongTo.belongTo || "";
            isDocument.documentType = documentData.documentType || "";
            isDocument.documentTypeId = documentData.documentTypeId || null;
            isDocument.documentUploadId = documentData.documentUploadId || "";
            const dob = [];
            // if (documentData.caseDocumentObservation && documentData.caseDocumentObservation.length > 0) {
            //     documentData.caseDocumentObservation.forEach(element => {
            //         dob.push(this.mapObservation(element));
            //     });

            // }
            // isDocument.observations = dob;
        }

        return isDocument;
    }

}
