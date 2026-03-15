const Ticket=require('../models/ticketNotification');
const {STATUS}=require('../utils/constants');

const create=async(data)=>{
    try{
        const ticket=await Ticket.create(data);
        return ticket;
    }catch(err){
        if(err.name=='ValidationError'){
            let error={};
            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            });

            throw{
                err:error,
                code:STATUS.UNPROCESSABLE_ENTITY
            }
        }
        throw err;
    }
}

const getAll=async()=>{
    try{
        const response=Ticket.find();
        return response;
    }catch(err){
        throw err;
    }
}

const getById=async(id)=>{
    try{
        const response=await Ticket.findById(id);
        if(!response){
            throw{
                err:"No ticket found",
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

module.exports={
    create,
    getAll,
    getById
}