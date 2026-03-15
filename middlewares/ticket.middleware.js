const {errorResponseBody}=require('../utils/responseBody');
const {STATUS}=require('../utils/constants');

const verifyTicketNotificationCreateRequest=async(req,res,next)=>{
    if(!req.body.subject){
        errorResponseBody.error='No subject given for the email';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.content){
        errorResponseBody.error='No content given for the email';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    if(!req.body.recepientEmails || !Array.isArray(req.body.recepientEmails) || req.body.recepientEmails.length<=0){
        errorResponseBody.error='No recepient Email given';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

module.exports={
    verifyTicketNotificationCreateRequest
}