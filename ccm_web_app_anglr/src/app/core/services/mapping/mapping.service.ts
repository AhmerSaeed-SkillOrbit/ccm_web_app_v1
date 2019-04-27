import { Injectable, Inject } from '@angular/core';

import { User } from '../../models/user';
import { Role } from '../../models/role';
import { FileUpload } from "../../models/fileUpload";
import { GenericFileUpload } from "../../models/genericFileUpload";
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
import { Comment, Reply } from '../../models/comment';
import { Ticket, TicketAssignee } from '../../models/ticket';
import { ActiveMedication, AllergyMedication, AllergyNonMedication, Vaccine, PersonalContactInfo, AlternateContactInfo, InsuranceInfo, SelfAssessmentInfo, AbilityConcernInfo, ResourceInfo, QuestionAnswer, Answer, DiabeteSupplement, DiabeteSupplementAnswer, PreventiveScreen, PreventiveScreenAnswer, PsychologicalReview, PsychologicalReviewAnswer, FunctionalReview, FunctionalReviewAnswer, SocialReview, SocialReviewAnswer, HealthCareHistory, HospitalizationHistory, SurgeryHistory, AssistanceType, AssistanceOrganization, PatientOrganizationAssistance } from '../../models/user.record';
import { CcmPlan, CcmPlanItem, CcmPlanItemGoal, CcmPlanHealthParam, HealthParam, CcmPlanReview } from '../../models/user.ccm.plan';

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
            isUser.patientUniqueId = userData.PatientUniqueId || null;
            isUser.firstName = userData.FirstName || null;
            isUser.middleName = userData.MiddleName || null;
            isUser.lastName = userData.LastName || null;
            isUser.email = userData.EmailAddress || null;
            isUser.functionalTitle = userData.FunctionalTitle || null;

            isUser.officeAddress = userData.OfficeAddress || null;
            isUser.residentialAddress = userData.ResidentialAddress || null;

            isUser.mobileNumber = userData.MobileNumber || null;
            isUser.phoneNumber = userData.TelephoneNumber || null;
            isUser.cnic = userData.Cnic || null;
            isUser.dateOfBirth = userData.DateOfBirth || null;
            isUser.age = userData.Age || null;
            isUser.ageGroup = userData.AgeGroup || null;
            isUser.gender = userData.Gender || null;
            // isUser.associationType = userData.AssociationType || null;
            isUser.blockReason = userData.BlockReason || null;
            isUser.profileSummary = userData.ProfileSummary || null;


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

            // isUser.profilePicture = this.mapFileUpload(userData.FileUpload);
            isUser.profilePicture = this.mapFileUpload(userData.ProfilePicture);
            if (userData.profilePicture) {
                // isUser.profilePicture = userData.profilePicture;

                // u.resume = this._fileService.mapDocument(element.resume);
            }

            // isUser.resume = this._fileService.mapDocument(userData.resume);

            isUser.isBlocked = userData.IsBlocked || false;
            isUser.isActive = userData.IsActive || false;
            isUser.lastLogin = userData.LastLogin || null;

            isUser.isCurrentlyLoggedIn = userData.IsCurrentlyLoggedIn || false;
            isUser.lastLoggedIn = userData.LastLoggedIn || null;
            isUser.loginDateTime = userData.LoginDateTime || null;

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
            isPermission.permissionName = permissionData.PermissionName || permissionData.Name || null;
            isPermission.permissionCode = permissionData.PermissionCodeName || permissionData.CodeName || null;
            isPermission.description = permissionData.Description || null;
            isPermission.tooltip = permissionData.ToolTip || null;
            isPermission.sortOrder = permissionData.SortOrder || null;
            isPermission.isActive = permissionData.IsActive || null;
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

            isAppointment.isActive = appointmentData.IsActive || true;
            isAppointment.createdBy = appointmentData.CreatedBy || null;
            isAppointment.updatedBy = appointmentData.UpdatedBy || null;
            isAppointment.createdOn = appointmentData.CreatedOn || null;
            isAppointment.updatedOn = appointmentData.UpdatedOn || null;

        }
        return isAppointment;
    }

    public mapFileUpload(res: any): FileUpload {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;

        // const userData = res.json();
        // const caseData = res.json().length > 0 ? res.json()[0] : null;
        const fileUploadData = res ? res : null;
        let isFileUpload = new FileUpload();
        if (fileUploadData) {
            isFileUpload.id = fileUploadData.Id || null;
            isFileUpload.fileUploadId = fileUploadData.Id || null;
            isFileUpload.fileUploadOriginalName = fileUploadData.FileOriginalName || "";
            isFileUpload.fileUploadName = fileUploadData.FileName || "";
            isFileUpload.fileUploadExtension = fileUploadData.FileExtension || "";
            isFileUpload.fileUploadUrl = fileUploadData.Path || "";
            isFileUpload.fileUploadBelongTo = fileUploadData.BelongTo || "";

            // isFileUpload.fileUploadType = fileUploadData.observationBelongTo.belongTo || "";
            isFileUpload.fileUploadType = fileUploadData.FileType || "";
            isFileUpload.fileUploadTypeId = fileUploadData.FileTypeId || null;

        }

        return isFileUpload;
    }

    public mapGenericFileUpload(res: any): GenericFileUpload {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;

        // const userData = res.json();
        // const caseData = res.json().length > 0 ? res.json()[0] : null;
        const genericFileUploadData = res ? res : null;
        let isGenericFileUpload = new GenericFileUpload();
        if (genericFileUploadData) {
            isGenericFileUpload.id = genericFileUploadData.Id || null;
            isGenericFileUpload.fileUploadId = genericFileUploadData.Id || null;
            isGenericFileUpload.fileUploadOriginalName = genericFileUploadData.FileOriginalName || "";
            isGenericFileUpload.fileUploadName = genericFileUploadData.FileName || "";
            isGenericFileUpload.fileUploadExtension = genericFileUploadData.FileExtension || "";
            isGenericFileUpload.fileUploadUrl = genericFileUploadData.Path || "";
            isGenericFileUpload.fileUploadBelongTo = genericFileUploadData.BelongTo || "";
            isGenericFileUpload.fileUploadPurpose = genericFileUploadData.Purpose || "";
            isGenericFileUpload.createdOn = genericFileUploadData.CreatedOn || null;

            isGenericFileUpload.role = this.mapRole(genericFileUploadData.Role);
            isGenericFileUpload.createdBy = this.mapUser(genericFileUploadData.CreatedBy);
            // isGenericFileUpload.fileUploadType = genericFileUploadData.observationBelongTo.belongTo || "";
            isGenericFileUpload.fileUploadType = genericFileUploadData.FileType || "";
            isGenericFileUpload.fileUploadTypeId = genericFileUploadData.FileTypeId || null;

        }

        return isGenericFileUpload;
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
            isTag.isActive = tagData.IsActive || true;

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
            isComment.isActive = commentData.IsActive || true;

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

            isTicket.type = ticketData.Type || null;
            isTicket.otherType = ticketData.OtherType || null;
            isTicket.priority = ticketData.Priority || null;
            isTicket.raisedFrom = ticketData.RaisedFrom || null;
            isTicket.trackStatus = ticketData.TrackStatus || null;


            isTicket.replyCount = ticketData.TicketReplyCount || null;
            // isTicket.replyList = ticketData.TicketReply || [];

            let rl = [];

            if (ticketData.TicketReply && ticketData.TicketReply.length > 0) {

                ticketData.TicketReply.forEach(element => {
                    rl.push(this.mapReply(element));
                });
            }


            isTicket.replyList = rl;

            // isTicket.ticketAssignee = ticketData.TicketAssignee || [];
            let ta = [];

            if (ticketData.TicketAssignee && ticketData.TicketAssignee.length > 0) {

                ticketData.TicketAssignee.forEach(element => {
                    ta.push(this.mapTicketAssignee(element));
                });
            }
            isTicket.ticketAssignee = ta;

            isTicket.role = this.mapRole(ticketData.Role);

            isTicket.createdBy = this.mapUser(ticketData.CreatedBy);

            isTicket.createdOn = ticketData.CreatedOn || null;
            isTicket.updatedOn = ticketData.UpdatedOn || null;

        }
        return isTicket;
    }

    public mapTicketAssignee(res: any): TicketAssignee {

        const ticketAssigneeData = res;
        const isTicketAssignee = new TicketAssignee();
        if (ticketAssigneeData) {
            isTicketAssignee.id = ticketAssigneeData.Id || null;
            isTicketAssignee.ticketAssigneeId = ticketAssigneeData.Id || null;
            isTicketAssignee.assignBy = this.mapUser(ticketAssigneeData.AssignBy);
            isTicketAssignee.assignByDescription = ticketAssigneeData.AssignByDescription || null;
            isTicketAssignee.assignTo = this.mapUser(ticketAssigneeData.AssignTo);
            isTicketAssignee.createdOn = ticketAssigneeData.CreatedOn || null;
        }
        return isTicketAssignee;
    }

    public mapReply(res: any): Reply {
        const replytData = res;
        const isReply = new Reply();
        if (replytData) {
            isReply.id = replytData.Id || null;
            isReply.replyId = replytData.Id || null;
            isReply.ticketId = replytData.TicketId || null;
            isReply.reply = replytData.Reply || null;
            isReply.userId = replytData.userId || null;
            isReply.vote = replytData.Vote || null;
            isReply.parentReplyId = replytData.ParentReplyId || null;
            isReply.isActive = replytData.IsActive || true;

            isReply.role = this.mapRole(replytData.Role);

            // isReply.createdBy = replytData.CreatedBy || null;
            // isReply.createdBy = this.mapUser(replytData.CreatedBy);
            isReply.createdBy = this.mapUser(replytData.ReplyBy);

            isReply.updatedBy = replytData.UpdatedBy || null;
            isReply.createdOn = replytData.CreatedOn || null;
            isReply.updatedOn = replytData.UpdatedOn || null;

        }
        return isReply;
    }

    public mapActiveMedication(res: any): ActiveMedication {
        const activeMedicationData = res;
        const isActiveMedication = new ActiveMedication();
        if (activeMedicationData) {
            isActiveMedication.id = activeMedicationData.Id || null;
            isActiveMedication.activeMedicationId = activeMedicationData.Id || null;
            isActiveMedication.medicineName = activeMedicationData.MedicineName || null;
            isActiveMedication.dose = activeMedicationData.DoseNumber || null;
            isActiveMedication.startBy = activeMedicationData.StartBy || null;
            isActiveMedication.startDate = activeMedicationData.StartDate || null;
            isActiveMedication.whyComments = activeMedicationData.WhyComments || null;
            isActiveMedication.isActive = activeMedicationData.IsActive || true;
        }

        return isActiveMedication;
    }

    public mapAllergyMedication(res: any): AllergyMedication {
        const allergyMedicationData = res;
        const isAllergyMedication = new AllergyMedication();
        if (allergyMedicationData) {
            isAllergyMedication.id = allergyMedicationData.Id || null;
            isAllergyMedication.allergyMedicationId = allergyMedicationData.Id || null;
            isAllergyMedication.medicineName = allergyMedicationData.MedicineName || null;
            isAllergyMedication.reaction = allergyMedicationData.MedicineReaction || null;
            isAllergyMedication.dateOccured = allergyMedicationData.ReactionDate || null;
            isAllergyMedication.isReactionSevere = allergyMedicationData.IsReactionSevere || false;
            isAllergyMedication.isActive = allergyMedicationData.IsActive || true;
        }

        return isAllergyMedication;
    }

    public mapAllergyNonMedication(res: any): AllergyNonMedication {
        const allergyNonMedicationData = res;
        const isAllergyNonMedication = new AllergyNonMedication();
        if (allergyNonMedicationData) {
            isAllergyNonMedication.id = allergyNonMedicationData.Id || null;
            isAllergyNonMedication.allergyNonMedicationId = allergyNonMedicationData.Id || null;
            isAllergyNonMedication.substanceName = allergyNonMedicationData.SubstanceName || null;
            isAllergyNonMedication.reaction = allergyNonMedicationData.SubstanceReaction || null;
            isAllergyNonMedication.dateOccured = allergyNonMedicationData.ReactionDate || null;
            isAllergyNonMedication.isReactionSevere = allergyNonMedicationData.IsReactionSevere || false;
            isAllergyNonMedication.isActive = allergyNonMedicationData.IsActive || true;
        }

        return isAllergyNonMedication;
    }

    public mapVaccine(res: any): Vaccine {
        const vaccineData = res;
        const isVaccine = new Vaccine();
        if (vaccineData) {
            isVaccine.id = vaccineData.Id || null;
            isVaccine.vaccineId = vaccineData.Id || null;
            isVaccine.vaccineName = vaccineData.Vaccine || null;
            isVaccine.vaccineDate = vaccineData.VaccineDate || null;
            isVaccine.isActive = vaccineData.IsActive || true;
        }

        return isVaccine;
    }


    public mapPersonalContactInfo(res: any): PersonalContactInfo {
        const personalContactInfoData = res;
        const isPersonalContactInfo = new PersonalContactInfo();
        if (personalContactInfoData) {
            isPersonalContactInfo.id = personalContactInfoData.Id || null;
            isPersonalContactInfo.personalContactInfoId = personalContactInfoData.Id || null;

            isPersonalContactInfo.ableToMessage = personalContactInfoData.AbleToMessage || false;
            isPersonalContactInfo.ableToCall = personalContactInfoData.AbleToCall || false;

            isPersonalContactInfo.feasibleMessageTime = personalContactInfoData.FeasibleMessageTime || null;
            if (isPersonalContactInfo.feasibleMessageTime) {
                isPersonalContactInfo.feasibleMessageTimeFrom = "";
                isPersonalContactInfo.feasibleMessageTimeTo = "";
            }

            isPersonalContactInfo.feasibleCallTime = personalContactInfoData.FeasibleCallTime || null;
            if (isPersonalContactInfo.feasibleCallTime) {
                isPersonalContactInfo.feasibleCallTimeFrom = "";
                isPersonalContactInfo.feasibleCallTimeTo = "";
            }

            isPersonalContactInfo.dayTimePhoneNumber = personalContactInfoData.DayTimePhoneNumber || null;
            isPersonalContactInfo.canCallOnDayTimePhone = personalContactInfoData.CanCallOnDayTimePhone || false;
            isPersonalContactInfo.canMsgOnDayTimePhone = personalContactInfoData.CanMsgOnDayTimePhone || false;

            isPersonalContactInfo.nightTimePhoneNumber = personalContactInfoData.NightTimePhoneNumber || null;
            isPersonalContactInfo.canCallOnNightTimePhone = personalContactInfoData.CanCallOnNightTimePhone || false;
            isPersonalContactInfo.canMsgOnNightTimePhone = personalContactInfoData.CanMsgOnNightTimePhone || false;

            isPersonalContactInfo.lastPcpVisitDate = personalContactInfoData.LastPcpVisitDate || null;
            isPersonalContactInfo.isAgreeCcmService = personalContactInfoData.IsAgreeCcmService || false;
            isPersonalContactInfo.isAgreeToDiscussHealthInfo = personalContactInfoData.IsAgreeToDiscussHealthInfo || false;

            isPersonalContactInfo.isInternetAvailable = personalContactInfoData.IsInternetAvailable || false;
            isPersonalContactInfo.isInternetHelper = personalContactInfoData.IsInternetHelper || false;
            isPersonalContactInfo.canUseInternet = personalContactInfoData.CanUseInternet || false;

            isPersonalContactInfo.wantToChange = personalContactInfoData.WantToChange || null;
            isPersonalContactInfo.effortToChange = personalContactInfoData.EffortToChange || null;

            isPersonalContactInfo.isActive = personalContactInfoData.IsActive || true;
        }

        return isPersonalContactInfo;
    }

    public mapAlternateContactInfo(res: any): AlternateContactInfo {
        const alternateContactInfoData = res;
        const isAlternateContactInfo = new AlternateContactInfo();
        if (alternateContactInfoData) {
            isAlternateContactInfo.id = alternateContactInfoData.Id || null;
            isAlternateContactInfo.alternateContactInfoId = alternateContactInfoData.Id || null;

            isAlternateContactInfo.careGiverName = alternateContactInfoData.CareGiverName || null;
            isAlternateContactInfo.careGiverPhoneNumber = alternateContactInfoData.CareGiverPhoneNumber || null;

            isAlternateContactInfo.emergencyContactName = alternateContactInfoData.EmergencyContactName || null;
            isAlternateContactInfo.emergencyContactPhoneNumber = alternateContactInfoData.EmergencyContactPhoneNumber || null;

            isAlternateContactInfo.financerName = alternateContactInfoData.FinancerName || null;
            isAlternateContactInfo.financerPhoneNumber = alternateContactInfoData.FinancerPhoneNumber || null;

            isAlternateContactInfo.healthCarerName = alternateContactInfoData.HealthCarerName || null;
            isAlternateContactInfo.healthCarerPhoneNumber = alternateContactInfoData.HealthCarerPhoneNumber || null;

            isAlternateContactInfo.comment = alternateContactInfoData.Comment || null;

            isAlternateContactInfo.isActive = alternateContactInfoData.IsActive || true;
        }

        return isAlternateContactInfo;
    }

    public mapInsuranceInfo(res: any): InsuranceInfo {
        const insuranceInfoData = res;
        const isInsuranceInfo = new InsuranceInfo();
        if (insuranceInfoData) {
            isInsuranceInfo.id = insuranceInfoData.Id || null;
            isInsuranceInfo.insuranceInfoId = insuranceInfoData.Id || null;

            isInsuranceInfo.insuranceType = insuranceInfoData.InsuranceType || null;
            isInsuranceInfo.insuranceOtherType = insuranceInfoData.InsuranceOtherType || null;
            isInsuranceInfo.insurancePolicyNumber = insuranceInfoData.InsurancePolicyNumber || null;

            isInsuranceInfo.coverageType = insuranceInfoData.CoverageType || null;
            isInsuranceInfo.coverageOtherType = insuranceInfoData.CoverageOtherType || null;
            isInsuranceInfo.coveragePolicyNumber = insuranceInfoData.CoveragePolicyNumber || null;

            isInsuranceInfo.comment = insuranceInfoData.Comment || null;

            isInsuranceInfo.isActive = insuranceInfoData.IsActive || true;
        }

        return isInsuranceInfo;
    }

    public mapSelfAssessmentInfo(res: any): SelfAssessmentInfo {
        const selfAssessmentInfoData = res;
        const isSelfAssessmentInfo = new SelfAssessmentInfo();
        if (selfAssessmentInfoData) {
            isSelfAssessmentInfo.id = selfAssessmentInfoData.Id || null;
            isSelfAssessmentInfo.selfAssessmentInfoId = selfAssessmentInfoData.Id || null;

            isSelfAssessmentInfo.liveType = selfAssessmentInfoData.LiveType || null;
            isSelfAssessmentInfo.liveOtherType = selfAssessmentInfoData.LiveOtherType || null;
            isSelfAssessmentInfo.liveComment = selfAssessmentInfoData.LiveComment || null;

            isSelfAssessmentInfo.challengeWith = selfAssessmentInfoData.ChallengeWith || null;
            isSelfAssessmentInfo.challengeOtherType = selfAssessmentInfoData.ChallengeOtherType || null;
            isSelfAssessmentInfo.challengeComment = selfAssessmentInfoData.ChallengeComment || null;

            isSelfAssessmentInfo.primaryLanguage = selfAssessmentInfoData.PrimaryLanguage || null;
            isSelfAssessmentInfo.primaryLanguageOther = selfAssessmentInfoData.PrimaryLanguageOther || null;
            isSelfAssessmentInfo.primaryLanguageComment = selfAssessmentInfoData.PrimaryLanguageComment || null;

            isSelfAssessmentInfo.learnBestBy = selfAssessmentInfoData.LearnBestBy || null;
            isSelfAssessmentInfo.learnBestByOther = selfAssessmentInfoData.LearnBestByOther || null;
            isSelfAssessmentInfo.learnBestByComment = selfAssessmentInfoData.LearnBestByComment || null;

            isSelfAssessmentInfo.thingImpactHealth = selfAssessmentInfoData.ThingImpactHealth || null;
            isSelfAssessmentInfo.thingImpactHealthOther = selfAssessmentInfoData.ThingImpactHealthOther || null;
            isSelfAssessmentInfo.thingImpactHealthComment = selfAssessmentInfoData.ThingImpactHealthComment || null;

            isSelfAssessmentInfo.isDietaryRequire = selfAssessmentInfoData.IsDietaryRequire || false;
            isSelfAssessmentInfo.dietaryRequireDescription = selfAssessmentInfoData.DietaryRequireDescription || null;

            isSelfAssessmentInfo.assistanceAvailable = selfAssessmentInfoData.AssistanceAvailable || null;


            isSelfAssessmentInfo.isActive = selfAssessmentInfoData.IsActive || true;
        }

        return isSelfAssessmentInfo;
    }

    public mapAbilityConcernInfo(res: any): AbilityConcernInfo {
        const abilityConcernInfoData = res;
        const isAbilityConcernInfo = new AbilityConcernInfo();
        if (abilityConcernInfoData) {
            isAbilityConcernInfo.id = abilityConcernInfoData.Id || null;
            isAbilityConcernInfo.abilityConcernId = abilityConcernInfoData.Id || null;


            isAbilityConcernInfo.manageChronicCondition = abilityConcernInfoData.ManageChronicCondition || false;
            isAbilityConcernInfo.manageChronicConditionComment = abilityConcernInfoData.ManageChronicConditionComment || null;

            isAbilityConcernInfo.decreaseEnergyLevel = abilityConcernInfoData.DecreaseEnergyLevel || false;
            isAbilityConcernInfo.decreaseEnergyLevelComment = abilityConcernInfoData.DecreaseEnergyLevelComment || null;

            isAbilityConcernInfo.canCleanHome = abilityConcernInfoData.CanCleanHome || false;
            isAbilityConcernInfo.canCleanHomeComment = abilityConcernInfoData.CanCleanHomeComment || null;

            isAbilityConcernInfo.emotionalCurrentIssue = abilityConcernInfoData.EmotionalCurrentIssue || false;
            isAbilityConcernInfo.emotionalCurrentIssueComment = abilityConcernInfoData.EmotionalCurrentIssueComment || null;

            isAbilityConcernInfo.manageMedication = abilityConcernInfoData.ManageMedication || false;
            isAbilityConcernInfo.manageMedicationComment = abilityConcernInfoData.ManageMedicationComment || null;

            isAbilityConcernInfo.obtainHealthyFood = abilityConcernInfoData.ObtainHealthyFood || false;
            isAbilityConcernInfo.obtainHealthyFoodComment = abilityConcernInfoData.ObtainHealthyFoodComment || null;

            isAbilityConcernInfo.copeLifeIssue = abilityConcernInfoData.CopeLifeIssue || false;
            isAbilityConcernInfo.copeLifeIssueComment = abilityConcernInfoData.CopeLifeIssueComment || null;

            isAbilityConcernInfo.isCurrentlyDnr = abilityConcernInfoData.IsCurrentlyDnr || false;
            isAbilityConcernInfo.currentlyDnrComment = abilityConcernInfoData.CurrentlyDnrComment || null;

            isAbilityConcernInfo.isCurrentlyPoa = abilityConcernInfoData.IsCurrentlyPoa || false;
            isAbilityConcernInfo.currentlyPoaComment = abilityConcernInfoData.CurrentlyPoaComment || null;

            isAbilityConcernInfo.isCurrentlyDirective = abilityConcernInfoData.IsCurrentlyDirective || false;
            isAbilityConcernInfo.currentlyDirectiveComment = abilityConcernInfoData.CurrentlyDirectiveComment || null;

            isAbilityConcernInfo.isAbleToMoveDaily = abilityConcernInfoData.IsAbleToMoveDaily || false;
            isAbilityConcernInfo.ableToMoveDailyComment = abilityConcernInfoData.AbleToMoveDailyComment || null;

            isAbilityConcernInfo.concernDetailComment = abilityConcernInfoData.ConcernDetailComment || null;


            isAbilityConcernInfo.isActive = abilityConcernInfoData.IsActive || true;
        }

        return isAbilityConcernInfo;
    }

    public mapResourceInfo(res: any): ResourceInfo {
        const resourceInfoData = res;
        const isResourceInfo = new ResourceInfo();
        if (resourceInfoData) {
            isResourceInfo.id = resourceInfoData.Id || null;
            isResourceInfo.resourceInfoId = resourceInfoData.Id || null;

            isResourceInfo.isForgetMedicine = resourceInfoData.IsForgetMedicine || false;
            isResourceInfo.isForgetMedicineComment = resourceInfoData.IsForgetMedicineComment || null;

            isResourceInfo.isForgetAppointment = resourceInfoData.IsForgetAppointment || false;
            isResourceInfo.isForgetAppointmentComment = resourceInfoData.IsForgetAppointmentComment || null;

            isResourceInfo.isGoWhenSick = resourceInfoData.IsGoWhenSick || false;
            isResourceInfo.isGoWhenSickComment = resourceInfoData.IsGoWhenSickComment || null;

            isResourceInfo.goWithoutFood = resourceInfoData.GoWithoutFood || false;
            isResourceInfo.goWithoutFoodComment = resourceInfoData.goWithoutFoodComment || null;

            isResourceInfo.isPowerShutOff = resourceInfoData.IsPowerShutOff || false;
            isResourceInfo.isPowerShutOffComment = resourceInfoData.IsPowerShutOffComment || null;

            isResourceInfo.getUnAbleToDress = resourceInfoData.GetUnAbleToDress || false;
            isResourceInfo.getUnAbleToDressComment = resourceInfoData.GetUnAbleToDressComment || null;

            isResourceInfo.hardToPrepareFood = resourceInfoData.HardToPrepareFood || false;
            isResourceInfo.hardToPrepareFoodComment = resourceInfoData.HardToPrepareFoodComment || null;

            isResourceInfo.isFrequentlySad = resourceInfoData.IsFrequentlySad || false;
            isResourceInfo.isFrequentlySadComment = resourceInfoData.IsFrequentlySadComment || null;

            isResourceInfo.hardToTakeBath = resourceInfoData.HardToTakeBath || false;
            isResourceInfo.hardToTakeBathComment = resourceInfoData.HardToTakeBathComment || null;

            isResourceInfo.isActive = resourceInfoData.IsActive || true;
        }

        return isResourceInfo;
    }

    public mapQuestionAnswer(res: any): QuestionAnswer {
        const questionAnswerData = res;
        const isQuestionAnswer = new QuestionAnswer();
        if (questionAnswerData) {
            isQuestionAnswer.id = questionAnswerData.Id || null;
            isQuestionAnswer.questionId = questionAnswerData.Id || null;
            isQuestionAnswer.question = questionAnswerData.Question || null;
            isQuestionAnswer.type = questionAnswerData.Type || null;

            isQuestionAnswer.answer = this.mapAnswer(questionAnswerData.Answer);

            isQuestionAnswer.isActive = questionAnswerData.IsActive || true;
        }

        return isQuestionAnswer;
    }

    public mapAnswer(res: any): Answer {
        const answerData = res;
        const isAnswer = new Answer();
        if (answerData) {
            isAnswer.id = answerData.Id || null;
            isAnswer.answerId = answerData.Id || null;
            isAnswer.isAnswered = answerData.IsAnswered || null;
            isAnswer.answer = answerData.Answer || null;

            isAnswer.isActive = answerData.IsActive || true;
        }

        return isAnswer;
    }

    public mapPreventiveScreen(res: any): PreventiveScreen {
        const preventiveScreenData = res;
        const isPreventiveScreen = new PreventiveScreen();
        if (preventiveScreenData) {
            isPreventiveScreen.id = preventiveScreenData.Id || null;
            isPreventiveScreen.preventiveScreenId = preventiveScreenData.Id || null;
            isPreventiveScreen.name = preventiveScreenData.Name || null;
            isPreventiveScreen.description = preventiveScreenData.Description || null;

            isPreventiveScreen.answer = this.mapPreventiveScreenAnswer(preventiveScreenData.Answer);

            isPreventiveScreen.isActive = preventiveScreenData.IsActive || true;
        }

        return isPreventiveScreen;
    }

    public mapPreventiveScreenAnswer(res: any): PreventiveScreenAnswer {
        const preventiveScreenAnswerData = res;
        const isPreventiveScreenAnswer = new PreventiveScreenAnswer();
        if (preventiveScreenAnswerData) {
            isPreventiveScreenAnswer.id = preventiveScreenAnswerData.Id || null;
            isPreventiveScreenAnswer.preventiveScreenAnswerId = preventiveScreenAnswerData.Id || null;
            isPreventiveScreenAnswer.isPatientExamined = preventiveScreenAnswerData.IsPatientExamined || null;
            isPreventiveScreenAnswer.description = preventiveScreenAnswerData.Description || null;

            isPreventiveScreenAnswer.isActive = preventiveScreenAnswerData.IsActive || true;
        }

        return isPreventiveScreenAnswer;
    }

    public mapDiabeteSupplement(res: any): DiabeteSupplement {
        const diabeteSupplementData = res;
        const isDiabeteSupplement = new DiabeteSupplement();
        if (diabeteSupplementData) {
            isDiabeteSupplement.id = diabeteSupplementData.Id || null;
            isDiabeteSupplement.diabeteSupplementId = diabeteSupplementData.Id || null;
            isDiabeteSupplement.name = diabeteSupplementData.Name || null;
            isDiabeteSupplement.description = diabeteSupplementData.Description || null;

            isDiabeteSupplement.answer = this.mapDiabeteSupplementAnswer(diabeteSupplementData.Answer);

            isDiabeteSupplement.isActive = diabeteSupplementData.IsActive || true;
        }

        return isDiabeteSupplement;
    }

    public mapDiabeteSupplementAnswer(res: any): DiabeteSupplementAnswer {
        const diabeteSupplementAnswerData = res;
        const isDiabeteSupplementAnswer = new DiabeteSupplementAnswer();
        if (diabeteSupplementAnswerData) {
            isDiabeteSupplementAnswer.id = diabeteSupplementAnswerData.Id || null;
            isDiabeteSupplementAnswer.diabeteSupplementAnswerId = diabeteSupplementAnswerData.Id || null;
            isDiabeteSupplementAnswer.isPatientMeasure = diabeteSupplementAnswerData.IsPatientMeasure || null;
            isDiabeteSupplementAnswer.description = diabeteSupplementAnswerData.Description || null;

            isDiabeteSupplementAnswer.isActive = diabeteSupplementAnswerData.IsActive || true;
        }

        return isDiabeteSupplementAnswer;
    }

    public mapPsychologicalReview(res: any): PsychologicalReview {
        const psychologicalReviewData = res;
        const isPsychologicalReview = new PsychologicalReview();
        if (psychologicalReviewData) {
            isPsychologicalReview.id = psychologicalReviewData.Id || null;
            isPsychologicalReview.psychologicalReviewId = psychologicalReviewData.Id || null;
            isPsychologicalReview.name = psychologicalReviewData.Name || null;
            isPsychologicalReview.description = psychologicalReviewData.Description || null;

            isPsychologicalReview.answer = this.mapPsychologicalReviewAnswer(psychologicalReviewData.Answer);

            isPsychologicalReview.isActive = psychologicalReviewData.IsActive || true;
        }

        return isPsychologicalReview;
    }

    public mapPsychologicalReviewAnswer(res: any): PsychologicalReviewAnswer {
        const psychologicalReviewAnswerData = res;
        const isPsychologicalReviewAnswer = new PsychologicalReviewAnswer();
        if (psychologicalReviewAnswerData) {
            isPsychologicalReviewAnswer.id = psychologicalReviewAnswerData.Id || null;
            isPsychologicalReviewAnswer.psychologicalReviewAnswerId = psychologicalReviewAnswerData.Id || null;
            isPsychologicalReviewAnswer.isPatientExamined = psychologicalReviewAnswerData.IsPatientExamined || null;
            isPsychologicalReviewAnswer.description = psychologicalReviewAnswerData.Description || null;

            isPsychologicalReviewAnswer.isActive = psychologicalReviewAnswerData.IsActive || true;
        }

        return isPsychologicalReviewAnswer;
    }

    public mapFunctionalReview(res: any): FunctionalReview {
        const functionalReviewData = res;
        const isFunctionalReview = new FunctionalReview();
        if (functionalReviewData) {
            isFunctionalReview.id = functionalReviewData.Id || null;
            isFunctionalReview.functionalReviewId = functionalReviewData.Id || null;
            isFunctionalReview.name = functionalReviewData.Name || null;
            isFunctionalReview.description = functionalReviewData.Description || null;

            isFunctionalReview.answer = this.mapFunctionalReviewAnswer(functionalReviewData.Answer);

            isFunctionalReview.isActive = functionalReviewData.IsActive || true;
        }

        return isFunctionalReview;
    }

    public mapFunctionalReviewAnswer(res: any): FunctionalReviewAnswer {
        const functionalReviewAnswerData = res;
        const isFunctionalReviewAnswer = new FunctionalReviewAnswer();
        if (functionalReviewAnswerData) {
            isFunctionalReviewAnswer.id = functionalReviewAnswerData.Id || null;
            isFunctionalReviewAnswer.functionalReviewAnswerId = functionalReviewAnswerData.Id || null;
            isFunctionalReviewAnswer.isOkay = functionalReviewAnswerData.IsOkay || null;
            isFunctionalReviewAnswer.description = functionalReviewAnswerData.Description || null;

            isFunctionalReviewAnswer.isActive = functionalReviewAnswerData.IsActive || true;
        }

        return isFunctionalReviewAnswer;
    }

    public mapSocialReview(res: any): SocialReview {
        const socialReviewData = res;
        const isSocialReview = new SocialReview();
        if (socialReviewData) {
            isSocialReview.id = socialReviewData.Id || null;
            isSocialReview.socialReviewId = socialReviewData.Id || null;
            isSocialReview.name = socialReviewData.Name || null;
            isSocialReview.description = socialReviewData.Description || null;

            isSocialReview.answer = this.mapSocialReviewAnswer(socialReviewData.Answer);

            isSocialReview.isActive = socialReviewData.IsActive || true;
        }

        return isSocialReview;
    }

    public mapSocialReviewAnswer(res: any): SocialReviewAnswer {
        const socialReviewData = res;
        const isSocialReview = new SocialReviewAnswer();
        if (socialReviewData) {
            isSocialReview.id = socialReviewData.Id || null;
            isSocialReview.socialReviewAnswerId = socialReviewData.Id || null;
            isSocialReview.isPatientExamined = socialReviewData.IsPatientExamined || null;
            isSocialReview.description = socialReviewData.Description || null;

            isSocialReview.isActive = socialReviewData.IsActive || true;
        }

        return isSocialReview;
    }

    public mapHealthCareHistory(res: any): HealthCareHistory {
        const healthCareHistoryData = res;
        const isHealthCareHistory = new HealthCareHistory();
        if (healthCareHistoryData) {
            isHealthCareHistory.id = healthCareHistoryData.Id || null;
            isHealthCareHistory.healthCareHistoryId = healthCareHistoryData.Id || null;
            isHealthCareHistory.provider = healthCareHistoryData.Provider || null;
            isHealthCareHistory.lastVisitDate = healthCareHistoryData.LastVisitDate || null;
            isHealthCareHistory.visitReason = healthCareHistoryData.VisitReason || null;
            isHealthCareHistory.isActive = healthCareHistoryData.IsActive || true;
        }

        return isHealthCareHistory;
    }

    public mapHospitalizationHistory(res: any): HospitalizationHistory {
        const hospitalizationHistoryData = res;
        const isHospitalizationHistory = new HospitalizationHistory();
        if (hospitalizationHistoryData) {
            isHospitalizationHistory.id = hospitalizationHistoryData.Id || null;
            isHospitalizationHistory.hospitalizationHistoryId = hospitalizationHistoryData.Id || null;
            isHospitalizationHistory.hospitalName = hospitalizationHistoryData.HospitalName || null;
            isHospitalizationHistory.hospitalizedDate = hospitalizationHistoryData.HospitalizedDate || null;
            isHospitalizationHistory.isHospitalized = hospitalizationHistoryData.IsHospitalized || false;
            isHospitalizationHistory.patientComments = hospitalizationHistoryData.PatientComments || null;
            isHospitalizationHistory.isActive = hospitalizationHistoryData.IsActive || true;
        }

        return isHospitalizationHistory;
    }

    public mapSurgeryHistory(res: any): SurgeryHistory {
        const surgeryHistoryData = res;
        const isSurgeryHistory = new SurgeryHistory();
        if (surgeryHistoryData) {
            isSurgeryHistory.id = surgeryHistoryData.Id || null;
            isSurgeryHistory.surgeryHistoryId = surgeryHistoryData.Id || null;
            isSurgeryHistory.diagnoseDescription = surgeryHistoryData.DiagnoseDescription || null;
            isSurgeryHistory.diagnoseDate = surgeryHistoryData.DiagnoseDate || null;
            isSurgeryHistory.needAttention = surgeryHistoryData.NeedAttention || false;
            isSurgeryHistory.currentProblem = surgeryHistoryData.CurrentProblem || null;
            isSurgeryHistory.isActive = surgeryHistoryData.IsActive || true;
        }

        return isSurgeryHistory;
    }

    public mapAssistanceType(res: any): AssistanceType {
        const assistanceTypeData = res;
        const isAssistanceType = new AssistanceType();
        if (assistanceTypeData) {
            isAssistanceType.id = assistanceTypeData.Id || null;
            isAssistanceType.assistanceTypeId = assistanceTypeData.Id || null;
            isAssistanceType.type = assistanceTypeData.Type || null;
            isAssistanceType.description = assistanceTypeData.Description || null;
            isAssistanceType.assistanceOrganizations = [];

            if (assistanceTypeData.AssistanceOrganization && assistanceTypeData.AssistanceOrganization.length > 0) {
                assistanceTypeData.AssistanceOrganization.forEach(element => {
                    let data = this.mapAssistanceOrganization(element);
                    isAssistanceType.assistanceOrganizations.push(data)
                });
            }

            isAssistanceType.isActive = assistanceTypeData.IsActive || true;
        }

        return isAssistanceType;
    }

    public mapAssistanceOrganization(res: any): AssistanceOrganization {
        const assistanceOrganizationData = res;
        const isAssistanceOrganization = new AssistanceOrganization();
        if (assistanceOrganizationData) {
            isAssistanceOrganization.id = assistanceOrganizationData.Id || null;
            isAssistanceOrganization.assistanceOrganizationId = assistanceOrganizationData.Id || null;
            isAssistanceOrganization.organization = assistanceOrganizationData.Organization || null;
            isAssistanceOrganization.telephoneNumber = assistanceOrganizationData.TelephoneNumber || null;
            isAssistanceOrganization.officeAddress = assistanceOrganizationData.OfficeAddress || false;
            isAssistanceOrganization.contactPerson = assistanceOrganizationData.ContactPerson || null;
            isAssistanceOrganization.description = assistanceOrganizationData.Description || null;
            isAssistanceOrganization.isActive = assistanceOrganizationData.IsActive || true;
        }

        return isAssistanceOrganization;
    }

    public mapPatientOrganizationAssistance(res: any): PatientOrganizationAssistance {
        const surgeryHistoryData = res;
        const isSurgeryHistory = new PatientOrganizationAssistance();
        if (surgeryHistoryData) {
            isSurgeryHistory.id = surgeryHistoryData.Id || null;
            isSurgeryHistory.patientOrganizationAssistanceId = surgeryHistoryData.Id || null;
            isSurgeryHistory.organization = surgeryHistoryData.Organization || null;
            isSurgeryHistory.telephoneNumber = surgeryHistoryData.TelephoneNumber || null;
            isSurgeryHistory.officeAddress = surgeryHistoryData.OfficeAddress || false;
            isSurgeryHistory.contactPerson = surgeryHistoryData.ContactPerson || null;
            isSurgeryHistory.description = surgeryHistoryData.Description || null;
            isSurgeryHistory.isPatientRefused = surgeryHistoryData.IsPatientRefused || false;

            isSurgeryHistory.assistanceOrganizationId = surgeryHistoryData.AssistanceOrganization ? surgeryHistoryData.AssistanceOrganization.Id || null : null;
            isSurgeryHistory.assistanceOrganization = this.mapAssistanceOrganization(surgeryHistoryData.AssistanceOrganization);

            isSurgeryHistory.assistanceTypeId = surgeryHistoryData.AssistanceOrganization ? (surgeryHistoryData.AssistanceOrganization.AssistanceType ? surgeryHistoryData.AssistanceOrganization.AssistanceType.Id || null : null) : null;
            isSurgeryHistory.assistanceType = surgeryHistoryData.AssistanceOrganization ? this.mapAssistanceType(surgeryHistoryData.AssistanceOrganization.AssistanceType) : new AssistanceType();

            isSurgeryHistory.isActive = surgeryHistoryData.IsActive || true;
        }

        return isSurgeryHistory;
    }

    public mapCcmPlan(res: any): CcmPlan {

        const ccmPlanData = res;
        const isCcmPlan = new CcmPlan();
        if (ccmPlanData) {
            isCcmPlan.id = ccmPlanData.Id || null;
            isCcmPlan.ccmPlanId = ccmPlanData.Id || null;
            isCcmPlan.planNumber = ccmPlanData.PlanNumber || null;
            isCcmPlan.startDate = ccmPlanData.StartDate || null;
            isCcmPlan.endDate = ccmPlanData.EndDate || null;

            let items = [];

            if (ccmPlanData.Item && ccmPlanData.Item.length > 0) {

                ccmPlanData.Item.forEach(element => {

                    let item = this.mapCcmPlanItem(element);

                    // let itemCheck = items.filter(i => (i.name == item.name));
                    let itemCheck = this._utilityService.findIndexViaItemName(item, items);

                    console.log("itemCheck", itemCheck);

                    // if (itemCheck && itemCheck.length > 0) {
                    if (itemCheck > -1) {

                        let goal = this.mapCcmPlanItemGoal(element);
                        items[itemCheck].itemGoals.push(goal);
                    }
                    else {
                        items.push(item);
                    }

                    // items.push(this.mapCcmPlanItem(element));

                });
            }
            isCcmPlan.items = items;


            isCcmPlan.isHealthParam = ccmPlanData.IsInitialHealthReading || false;
            // isCcmPlan.isHealthParam = ccmPlanData.HealthParams && ccmPlanData.HealthParams.length > 0 ? true : false;
            // isCcmPlan.healthParams = ccmPlanData.HealthParams || [];

            let hps = [];
            if (ccmPlanData.HealthParams && ccmPlanData.HealthParams.length > 0) {

                ccmPlanData.HealthParams.forEach(element => {
                    hps.push(this.mapCcmPlanHealthParam(element));
                });
            }
            isCcmPlan.healthParams = hps;


            isCcmPlan.createdBy = this.mapUser(ccmPlanData.CreatedBy);

            isCcmPlan.createdOn = ccmPlanData.CreatedOn || null;
            isCcmPlan.updatedOn = ccmPlanData.UpdatedOn || null;

            isCcmPlan.isActive = ccmPlanData.IsActive || true;

        }
        return isCcmPlan;
    }

    public mapCcmPlanItem(res: any): CcmPlanItem {
        const ccmPlanItemData = res;
        const isCcmPlanItem = new CcmPlanItem();
        if (ccmPlanItemData) {
            isCcmPlanItem.id = ccmPlanItemData.Id || null;
            isCcmPlanItem.ccmPlanItemId = ccmPlanItemData.Id || null;
            isCcmPlanItem.name = ccmPlanItemData.ItemName || null;

            let cpig = this.mapCcmPlanItemGoal(ccmPlanItemData);

            isCcmPlanItem.itemGoals.push(cpig);

            isCcmPlanItem.isActive = ccmPlanItemData.IsActive || true;
        }

        return isCcmPlanItem;
    }

    public mapCcmPlanItemGoal(res: any): CcmPlanItemGoal {
        const ccmPlanItemGoalData = res;
        const isCcmPlanItemGoal = new CcmPlanItemGoal();
        if (ccmPlanItemGoalData) {
            isCcmPlanItemGoal.id = ccmPlanItemGoalData.Id || null;
            isCcmPlanItemGoal.ccmPlanItemGoalId = ccmPlanItemGoalData.Id || null;
            isCcmPlanItemGoal.goalNumber = ccmPlanItemGoalData.GoalNumber || null;
            isCcmPlanItemGoal.goal = ccmPlanItemGoalData.Goal || null;
            isCcmPlanItemGoal.intervention = ccmPlanItemGoalData.Intervention || null;
            isCcmPlanItemGoal.result = ccmPlanItemGoalData.Result || false;
            isCcmPlanItemGoal.patientComment = ccmPlanItemGoalData.PatientComment || null;
            isCcmPlanItemGoal.reviewerComment = ccmPlanItemGoalData.ReviewerComment || null;
            isCcmPlanItemGoal.isActive = ccmPlanItemGoalData.IsActive || true;
        }

        return isCcmPlanItemGoal;
    }

    public mapCcmPlanHealthParam(res: any): CcmPlanHealthParam {
        const ccmPlanHealthParamData = res;
        const isCcmPlanHealthParam = new CcmPlanHealthParam();
        if (ccmPlanHealthParamData) {
            isCcmPlanHealthParam.id = ccmPlanHealthParamData.Id || null;
            isCcmPlanHealthParam.ccmPlanHealthParamId = ccmPlanHealthParamData.Id || null;
            isCcmPlanHealthParam.readingValue = ccmPlanHealthParamData.ReadingValue || null;
            isCcmPlanHealthParam.readingDate = ccmPlanHealthParamData.ReadingDate || null;

            isCcmPlanHealthParam.healthParamId = ccmPlanHealthParamData.HealthParam ? ccmPlanHealthParamData.HealthParam.Id || null : null;
            isCcmPlanHealthParam.healthParam = this.mapHealthParam(ccmPlanHealthParamData.HealthParam);

            isCcmPlanHealthParam.isActive = ccmPlanHealthParamData.IsActive || true;
        }

        return isCcmPlanHealthParam;
    }

    public mapHealthParam(res: any): HealthParam {
        const healthParamData = res;
        const isHealthParam = new HealthParam();
        if (healthParamData) {
            isHealthParam.id = healthParamData.Id || null;
            isHealthParam.healthParamId = healthParamData.Id || null;
            isHealthParam.name = healthParamData.Name || null;
            isHealthParam.description = healthParamData.Description || null;
            isHealthParam.isActive = healthParamData.IsActive || true;
        }

        return isHealthParam;
    }

    public mapCcmPlanReview(res: any): CcmPlanReview {
        const ccmPlanReviewData = res;
        const isCcmPlanReview = new CcmPlanReview();
        if (ccmPlanReviewData) {
            isCcmPlanReview.id = ccmPlanReviewData.Id || null;
            isCcmPlanReview.ccmPlanReviewId = ccmPlanReviewData.Id || null;
            isCcmPlanReview.barrier = ccmPlanReviewData.Barrier || null;
            isCcmPlanReview.reviewDate = ccmPlanReviewData.ReviewDate || null;
            isCcmPlanReview.reviewerComment = ccmPlanReviewData.ReviewerComment || null;


            isCcmPlanReview.ccmPlan = this.mapCcmPlan(ccmPlanReviewData.CcmPlan);
            isCcmPlanReview.ccmPlanItemName = this.mapCcmPlanItem(ccmPlanReviewData.CcmPlanGoal).name;
            isCcmPlanReview.ccmPlanItem = this.mapCcmPlanItem(ccmPlanReviewData.CcmPlanGoal);
            isCcmPlanReview.ccmPlanItemGoalId = this.mapCcmPlanItemGoal(ccmPlanReviewData.CcmPlanGoal).id;
            isCcmPlanReview.ccmPlanItemGoal = this.mapCcmPlanItemGoal(ccmPlanReviewData.CcmPlanGoal);


            isCcmPlanReview.isGoalAchieve = ccmPlanReviewData.IsGoalAchieve || false;
            isCcmPlanReview.isActive = ccmPlanReviewData.IsActive || true;
        }

        return isCcmPlanReview;
    }

}
