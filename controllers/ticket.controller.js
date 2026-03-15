const notificationService=require('../services/notification.service');
const {errorResponseBody,successResponseBody}=require('../utils/responseBody');
const {STATUS}=require('../utils/constants');

const createTicket=async(req,res)=>{
    try{
        const response=await notificationService.create(req.body);
        successResponseBody.data=response;
        successResponseBody.message='Successfully created a notification ticket';
        return res.status(STATUS.CREATED).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}   

const getAllTickets=async(req,res)=>{
    try{
        const response=await notificationService.getAll();
        successResponseBody.data=response;
        successResponseBody.message='Successfully fetched all the tickets';
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err.err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTicket=async(req,res)=>{
    try{
        const response=await notificationService.getById(req.params.id);
        successResponseBody.data=response;
        successResponseBody.message='Successfully fetched the tickets';
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err.err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports={
    createTicket,
    getAllTickets,
    getTicket
}
