import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Token } from '../../models/token';
import { Subject } from 'rxjs/Subject';
import { Permission } from '../../models/permission';

export interface IAuthService {

    /**
     * Subscribe to get Login Status Change events
     */
    loginStatusChanged: Subject<boolean>;
    loginUserStatusChanged: Subject<User>;

    // loginStatusChangedNew : Subject<any>;
    /**
     * Returns user object on successfull logged in
     * @param userId
     * @param password
     * @returns {Obaservable<User>}
     */
    checkLogin(user: User): Observable<any>;

    /**
     * Register a new user with Auth server
     * @param user
     * @param inviteCode
     * @param type
     * @returns {Observable<User>}
     */
    // register(user: User): Observable<User>;
    register(user: User, inviteCode: string, type: string): Observable<any>;

    /**
     * Verify Token with Auth server
     * @param inviteCode
     * @param type
     * @returns {Observable<User>}
     */
    verifyToken(inviteCode: string, type: string): Observable<any>;

    /**
     * Update Registered user
     * @param user
     * @return {Observable<User>}
     */
    update(user: User): Observable<User>;

    /**
     * Returns response after sending email link to user
     * @returns {Observable<any>}
     */
    forgotPassword(user: User): Observable<any>;

    /**
     * Returns response after resetting password
     * @returns {Observable<User>}
     */
    resetPassword(user: User, key: string): Observable<any>;

    /**
     * Returns specified key to verify user's account
     * @returns {Observable<any>}
     */
    verifyKey(key: string): Observable<any>;

    /**
     * Resend email to verify account
     * @returns {Observable<any>}
     */
    resendEmail(user: User): Observable<any>;

    /**
     * Resend email to verify account
     * @returns {Observable<any>}
     */
    resendVerificationEmail(user: User): Observable<any>;

    /**
     * Returns token from local Storage, if a user is logged in otherwise returns an empty string
     * @returns {string}
     */
    getToken(): string;

    getTokenData(): Token;

    checkToken(): boolean;

    /**
     * Returns Logged In User or null if a user is not logged in yet
     * @returns {User}
     */
    getLoggedinUser(): User;

    /**
     * Returns true if a user is logged in otherwise returns false
     * @returns {boolean}
     */
    isLoggedIn(): boolean;

    /**
     * Check if entity name (i.e brnad name, agency name or influcener agent name)
     * is available (200 http status code)
     */
    checkEntityNameAvailability(entityName, entityType): Observable<any>;

    /**
     * Check if sap id is available
     */
    checkSapIdAvailability(sapId): Observable<any>;

    /**
     * Check if email is available
     */
    checkEmailAvailability(emailAddress, entityType): Observable<any>;

    /**
     * Store user in local storage
     */
    storeUser(user: User);

    /**
     * Store user permission in local storage
     */
    storePermission(permissions: Permission[]);

    /**
     * get user from local storage
     */
    getUser(): User;

    /**
     * get user permissions from local storage
     */
    getUserPermissions(): Permission[];


    /**
     * Store url in local storage
     */
    storeUrlPath(urlPath: string);

    /**
     * Verify email
     */
    verifyEmail(email: String);

    /**
     * get url from local storage
     */
    getUrlPath(): string;

    /**
     * remove user from local storage
     */
    logoutUser();

    /**
     * status code check
     */
    errStatusCheck(err: any): any;

    /**
     * status code check
     */
    errStatusCheckResponse(err: any): any;

}
