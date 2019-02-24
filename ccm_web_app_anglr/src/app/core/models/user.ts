import { BaseModel } from './base.model';

import { Role } from './role';
import { Permission } from './permission';
import { Document } from './document';
import { Country } from './country';
import { Region } from './region';
import { City } from './city';
import { Branch } from './branch';

export class User extends BaseModel {

    userId: number;
    sapId: string;
    firstName: string;
    lastName: string;
    joiningDate: string;
    password: any;
    confirmPassword: any;
    email: string;

    fullName: string;
    mobileNumber: String;
    phoneNumber: String;

    officeAddress: String;
    ResidentialAddress: String;

    cnic: String;

    credentials: String;
    title: String;
    functionalTitle: String;
    age: String;
    ageGroup: String;

    country: Country = new Country();
    // country: string;
    countryName: string;
    countryId: number;

    region: Region = new Region();
    // region: string;
    regionName: string;
    regionId: number;

    // state: State = new State();
    state: string;
    stateId: number;

    city: City = new City();
    // city: string;
    cityId: number;

    branch: Branch = new Branch();
    // branch: string;
    branchId: number;

    userStatus: string;
    zipCode: string;
    terms: string;
    token: string;
    expiry: number;
    entityType: string;
    entityName: string;
    entityId: number;
    profilePicture: any;
    accountVerified: boolean;

    userRole: string;
    roles: Role[] = [];
    permissions: Permission[];
    userRolePermission: Role = new Role();
    roleName: string;
    roleCode: string;


    resume: Document = new Document();

    // roleId: number;
    // roleName: string;

    lastLogin: string;
    stateName: string;

    // createdOn: string;
    // createdBy: string;
    // updatedOn: string;
    // updatedBy: string;
    gender: string;

    utcDSTOffset: number;
    // employer: string;
    // address: string;
    // state: string;
    // secretQuestion1: string;
    // secretQuestion2: string;
    // secretAnswer1: string;
    // secretAnswer2: string;
    // webUrl: string;
    unsuccessfulAttempt: string;
    isActive: boolean;
    isBlocked: boolean;
    isLoggedIn: boolean;

    isBlockDisabled: boolean = false;
    isUnBlockDisabled: boolean = false;

    isAddFlagDisabled: boolean = false;
    isRemoveFlagDisabled: boolean = false;


}
