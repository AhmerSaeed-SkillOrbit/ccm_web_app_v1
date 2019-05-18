import { BaseModel } from './base.model';

import { Role } from './role';
import { Permission } from './permission';
import { FileUpload } from './fileUpload';
import { Country } from './country';
import { Region } from './region';
import { City } from './city';
import { Branch } from './branch';
import { PatientType } from './patient.type';

export class User extends BaseModel {

    userId: number;
    patientUniqueId: string;
    fullName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    joiningDate: string;
    password: any;
    confirmPassword: any;
    email: string;

    primaryTelephoneNumber: String;
    countryPhoneCode: String;
    mobileNumber: String;
    phoneNumber: String;
    profileSummary: String;

    officeAddress: String;
    residentialAddress: String;

    cnic: String;

    credentials: String;
    title: String;
    functionalTitle: String;
    age: String;
    ageGroup: String;
    dateOfBirth: String;
    gender: String;

    patientTypeId: number;
    patientType: PatientType = new PatientType();

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

    accountVerified: boolean;

    userRole: string;
    roles: Role[] = [];
    permissions: Permission[];
    userRolePermission: Role = new Role();

    role: Role = new Role();
    roleId: number;
    roleName: string;
    roleCode: string;

    profilePicture: FileUpload = new FileUpload();
    resume: FileUpload = new FileUpload();

    // roleId: number;
    // roleName: string;

    isCurrentlyLoggedIn: boolean = false;
    lastLoggedIn: string;
    loginDateTime: string;
    lastLogin: string;
    stateName: string;

    // createdOn: string;
    // createdBy: string;
    // updatedOn: string;
    // updatedBy: string;

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
    blockReason: string;
    isLoggedIn: boolean;

    isBlockDisabled: boolean = false;
    isUnBlockDisabled: boolean = false;

    isAddFlagDisabled: boolean = false;
    isRemoveFlagDisabled: boolean = false;


}
