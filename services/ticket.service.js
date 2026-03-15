const Ticket = require("../models/ticketNotification");

const create = async (data) => {
  return await Ticket.create(data);
};

const getAll = async () => {
  return await Ticket.find();
};

const getById = async (id) => {
  return await Ticket.findById(id);
};

module.exports = {
  create,
  getAll,
  getById
};