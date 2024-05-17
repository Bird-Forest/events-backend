const { ctrlWrapper, HttpError } = require("../middlewares");
const { Event } = require("../models/event");
// ***
const getAllEvents = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  const skip = (page - 1) * limit;

  const result = await Event.find().skip(skip).limit(parseInt(limit));
  res.json(result);
};
// ***
const getEventById = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
// ***
const addEvent = async (req, res) => {
  const result = await Event.create({ ...req.body });
  res.status(201).json(result);
};
// ***
const updateEvent = async (req, res) => {
  const { id } = req.params;

  const result = await Event.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  // const updateEvent = await result.save();
  // console.log(result);
  res.status(201).json({ message: "Succeses" });
};

module.exports = {
  getAllEvents: ctrlWrapper(getAllEvents),
  addEvent: ctrlWrapper(addEvent),
  getEventById: ctrlWrapper(getEventById),
  updateEvent: ctrlWrapper(updateEvent),
};
