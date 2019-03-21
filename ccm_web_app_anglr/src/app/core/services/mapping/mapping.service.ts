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
import { Schedule, ScheduleDetail, ScheduleShift, TimeSlot } from '../../models/schedule.model';
import { Appointment } from '../../models/appointment';
import { ForumFeed } from '../../models/forum';
import { Tag } from '../../models/tag';
import { Comment } from '../../models/comment';
import { Ticket } from '../../models/ticket';

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
            isUser.functionalTitle = userData.FunctionalTitle || null;

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

            isUser.role = this.mapRole(userData.Role);
            isUser.roleId = userData.Role ? userData.Role.Id : null;
            isUser.roleCode = userData.RoleCodeName || null;
            isUser.roleName = userData.RoleName || null;
            // isUser.roles = userData.roles;
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
            isRole.id = roleData.Id || null;
            isRole.roleId = roleData.Id || null;
            isRole.roleName = roleData.RoleName || roleData.Name || null;
            isRole.roleCode = roleData.RoleCodeName || roleData.CodeName || null;
            // isRole.departmentId = roleData.departmentId || null;
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


    public mapSchedule(res: any): Schedule {
        // const scheduleData = res;

        const scheduleData = res;
        const isSchedule = new Schedule();
        if (scheduleData) {
            isSchedule.id = scheduleData.Id || null;
            isSchedule.scheduleId = scheduleData.Id || null;
            isSchedule.doctorFirstName = scheduleData.FirstName || null;
            isSchedule.doctorLastName = scheduleData.LastName || null;
            isSchedule.monthId = scheduleData.MonthName && scheduleData.MonthName > 0 ? (+scheduleData.MonthName - 1) || 0 : null;
            isSchedule.year = scheduleData.YearName || null;
            isSchedule.startDate = scheduleData.StartDate || null;
            isSchedule.endDate = scheduleData.EndDate || null;

            let month = Config.months.filter(m => m.id === +isSchedule.monthId);

            if (month.length > 0) {
                isSchedule.month = month[0];
            }

            let sd = [];

            if (scheduleData.DoctorScheduleDetails && scheduleData.DoctorScheduleDetails.length > 0) {

                scheduleData.DoctorScheduleDetails.forEach(element => {
                    sd.push(this.mapScheduleDetail(element));
                });
            }
            else {

            }

            isSchedule.scheduleDetails = sd;
        }


        return isSchedule;
    }

    public mapScheduleDetail(res: any): ScheduleDetail {
        const scheduleDetailData = res;
        const isScheduleDetail = new ScheduleDetail();
        if (scheduleDetailData) {
            isScheduleDetail.id = scheduleDetailData.Id || null;
            isScheduleDetail.isOffDay = scheduleDetailData.IsOffDay || false;
            isScheduleDetail.noOfShift = scheduleDetailData.NoOfShift || null;
            isScheduleDetail.scheduleDate = scheduleDetailData.ScheduleDate || null;

            let ss = [];
            if (scheduleDetailData.ScheduleShifts && scheduleDetailData.ScheduleShifts.length > 0) {
                scheduleDetailData.ScheduleShifts.forEach(element => {
                    ss.push(this.mapScheduleShift(element));
                    // console.log("ss ", ss)
                });
            }

            isScheduleDetail.scheduleShifts = ss;
            // console.log("isScheduleDetail.scheduleShifts", isScheduleDetail.scheduleShifts);
        }


        return isScheduleDetail;
    }

    public mapScheduleShift(res: any): ScheduleShift {

        // console.log("mapScheduleShift res", res)
        // console.log("mapScheduleShift res.Id", res.Id)
        const scheduleShiftData = res;
        const isScheduleShift = new ScheduleShift();
        if (scheduleShiftData) {
            isScheduleShift.id = scheduleShiftData.Id || null;
            isScheduleShift.scheduleShiftId = scheduleShiftData.Id || null;
            isScheduleShift.startTime = scheduleShiftData.StartTime || null;
            // isScheduleShift.startTime12h = scheduleShiftData.StartTime || null;
            // isScheduleShift.startTime = this._utilityService.convertTime12to24(scheduleShiftData.StartTime);
            isScheduleShift.endTime = scheduleShiftData.EndTime || null;
            // isScheduleShift.endTime12h = scheduleShiftData.EndTime || null;
            // isScheduleShift.endTime = this._utilityService.convertTime12to24(scheduleShiftData.EndTime);
            isScheduleShift.noOfPatientAllowed = scheduleShiftData.NoOfPatientAllowed || null;

            let ts = [];

            if (scheduleShiftData.TimeSlot && scheduleShiftData.TimeSlot.length > 0) {

                scheduleShiftData.TimeSlot.forEach(element => {
                    ts.push(this.mapTimeSlot(element));
                });
            }


            isScheduleShift.timeSlots = ts;
        }
        return isScheduleShift;
    }

    public mapTimeSlot(res: any): TimeSlot {
        const timeSlotData = res;
        const isTimeSlot = new TimeSlot();
        if (timeSlotData) {
            isTimeSlot.id = timeSlotData.Id || null;
            isTimeSlot.timeSlotId = timeSlotData.Id || null;
            isTimeSlot.scheduleShiftId = timeSlotData.DoctorScheduleShiftId || null;
            isTimeSlot.timeSlot = timeSlotData.TimeSlot || false;
            isTimeSlot.isBooked = timeSlotData.IsBooked || null;
        }
        return isTimeSlot;
    }

    public mapAppointment(res: any): Appointment {
        const appointmentData = res;
        const isAppointment = new Appointment();
        if (appointmentData) {
            isAppointment.id = appointmentData.Id || null;
            isAppointment.appointmentId = appointmentData.Id || null;
            isAppointment.appointmentNumber = appointmentData.AppointmentNumber || null;

            isAppointment.scheduleDate = appointmentData.ScheduleDate || null;

            isAppointment.patientId = appointmentData.PatientId || null;
            isAppointment.patientFirstName = appointmentData.PatientFirstName || null;
            isAppointment.patientLastName = appointmentData.PatientLastName || null;

            isAppointment.doctorId = appointmentData.DoctorId || null;
            isAppointment.doctorFirstName = appointmentData.DoctorFirstName || null;
            isAppointment.doctorLastName = appointmentData.DoctorLastName || null;

            isAppointment.shiftId = appointmentData.DoctorScheduleShiftId || null;

            isAppointment.timeSlotId = appointmentData.TimeSlotId || null;
            isAppointment.timeSlot.timeSlot = appointmentData.TimeSlot || null;

            isAppointment.comment = appointmentData.Description || null;

            isAppointment.requestStatus = appointmentData.RequestStatus || null;
            isAppointment.requestStatusReason = appointmentData.RequestStatusReason || null;
            isAppointment.appointmentStatus = appointmentData.AppointmentStatus || null;
            isAppointment.appointmentStatusReason = appointmentData.AppointmentStatusReason || null;

            isAppointment.isActive = appointmentData.IsActive || false;
            isAppointment.createdBy = appointmentData.CreatedBy || null;
            isAppointment.updatedBy = appointmentData.UpdatedBy || null;
            isAppointment.createdOn = appointmentData.CreatedOn || null;
            isAppointment.updatedOn = appointmentData.UpdatedOn || null;

        }
        return isAppointment;
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

    public mapForumFeed(res: any): ForumFeed {

        // console.log("mapScheduleShift res", res)
        // console.log("mapScheduleShift res.Id", res.Id)
        const forumData = res;
        const isForum = new ForumFeed();
        if (forumData) {
            isForum.id = forumData.Id || null;
            isForum.forumId = forumData.Id || null;
            isForum.title = forumData.Title || null;
            isForum.description = forumData.Description || null;

            isForum.role = this.mapRole(forumData.Role);

            isForum.createdBy = this.mapUser(forumData.CreatedBy);

            isForum.createdOn = forumData.CreatedOn || null;
            isForum.updatedOn = forumData.UpdatedOn || null;

            const t = [];
            const tId = [];
            if (forumData.Tags && forumData.Tags.length > 0) {
                forumData.Tags.forEach(element => {
                    if (element) {
                        t.push(this.mapTag(element));
                        tId.push(this.mapTag(element).id);
                    }

                });

            }

            isForum.commentCount = forumData.CommentCount || null;

            isForum.tags = t;
            isForum.tagIds = tId;


            let cl = [];

            if (forumData.Comments && forumData.Comments.length > 0) {

                forumData.Comments.forEach(element => {
                    cl.push(this.mapComment(element));
                });
            }


            isForum.commentList = cl;
        }
        return isForum;
    }

    public mapTag(res: any): Tag {
        const tagData = res;
        const isTag = new Tag();
        if (tagData) {
            isTag.id = tagData.Id || null;
            isTag.tagId = tagData.Id || null;
            isTag.name = tagData.Name || null;
            isTag.code = tagData.Code || null;
            isTag.toolTip = tagData.ToolTip || null;
            isTag.description = tagData.Description || null;
            isTag.sortOrder = tagData.SortOrder || null;
            isTag.createdBy = tagData.CreatedBy || null;
            isTag.updatedBy = tagData.UpdatedBy || null;
            isTag.createdOn = tagData.CreatedOn || null;
            isTag.updatedOn = tagData.UpdatedOn || null;
            isTag.isActive = tagData.IsActive || false;

        }
        return isTag;
    }

    public mapComment(res: any): Comment {
        const commentData = res;
        const isComment = new Comment();
        if (commentData) {
            isComment.id = commentData.Id || null;
            isComment.commentId = commentData.Id || null;
            isComment.forumTopicId = commentData.ForumTopicId || null;
            isComment.comment = commentData.Comment || null;
            isComment.userId = commentData.userId || null;
            isComment.vote = commentData.Vote || null;
            isComment.parentCommentId = commentData.ParentCommentId || null;
            isComment.isActive = commentData.IsActive || false;

            isComment.role = this.mapRole(commentData.Role);

            // isComment.createdBy = commentData.CreatedBy || null;
            isComment.createdBy = this.mapUser(commentData.CreatedBy);

            isComment.updatedBy = commentData.UpdatedBy || null;
            isComment.createdOn = commentData.CreatedOn || null;
            isComment.updatedOn = commentData.UpdatedOn || null;

        }
        return isComment;
    }

    public mapTicket(res: any): Ticket {

        const ticketData = res;
        const isTicket = new Ticket();
        if (ticketData) {
            isTicket.id = ticketData.Id || null;
            isTicket.ticketId = ticketData.Id || null;
            isTicket.title = ticketData.Title || null;
            isTicket.ticketNumber = ticketData.TicketNumber || null;
            isTicket.description = ticketData.Description || null;

            isTicket.otherType = ticketData.Description || null;
            isTicket.priority = ticketData.Description || null;
            isTicket.raisedFrom = ticketData.Description || null;
            isTicket.trackStatus = ticketData.TrackStatus || null;

            isTicket.role = this.mapRole(ticketData.Role);

            isTicket.createdBy = this.mapUser(ticketData.CreatedBy);

            isTicket.createdOn = ticketData.CreatedOn || null;
            isTicket.updatedOn = ticketData.UpdatedOn || null;

        }
        return isTicket;
    }

}
