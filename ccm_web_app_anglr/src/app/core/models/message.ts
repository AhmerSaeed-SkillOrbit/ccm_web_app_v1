export enum MessageTypes {
    Information,
    Confirmation,
    Warning,
    Error
}

export class Message {
 
    msgType : MessageTypes= MessageTypes.Information;
    iconType = 'info';
    msg : string = 'Test';
    title : string = 'CCM';
    autoCloseAfter : number = 0;
    okBtnTitle = 'Ok';
    cancelBtnTitle = 'Cancel';
    showInput= 'none';
    onOkBtnClick : (res,id) => any;
    onCancelBtnClick : () => any;
}