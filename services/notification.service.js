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
                err,
                code:STATUS.UNPROCESSABLE_ENTITY
            }
        }
        throw err;
    }
}

module.exports={
    create
}