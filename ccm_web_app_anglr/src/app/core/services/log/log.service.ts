import { Injectable } from "@angular/core";
import { ILogService } from "./ilog.service";
import { LogMessage, LogTypes } from "../../models/log.message";
import { environment } from "../../../../environments/environment";

/**
 * Log Service
 */
@Injectable()
export class LogService implements ILogService {
    log(msg: LogMessage) {
        // if(msg.LogType == LogTypes.Error)
        // console.error(msg);
        //else
        // console.log(msg);
    }
    logAction(action: string, tag: string) {
        console.log(action + ' ' + tag);
    }

    logMessage(msg) {
        if (environment.showLog)
            console.log(msg);
    }

    logError(err) {
        if (environment.showLog)
            console.error(err);
    }

    logWarn(warn) {
        if (environment.showLog)
            console.warn(warn);
    }

    logRequest(req) {
        if (environment.showLog) {
            console.log("Request Intercepted");

            console.log(req);
        }
    }

    logResponse(res) {
        if (environment.showLog) {
            console.log("Reponse Intercepted");
            console.log(res);
        }
    }

    logResponseError(resErr) {
        if (environment.showLog) {
            console.log("Reponse Intercepted with Error");
            console.log(resErr);
        }
    }
}