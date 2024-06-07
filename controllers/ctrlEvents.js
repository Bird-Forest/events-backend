const { ctrlWrapper, HttpError } = require("../middlewares");
const { Event } = require("../models/event");

// ***
const getAllEvents = async (req, res) => {
  const result = await Event.find();
  res.json(result);
};
// ***
const getEvents = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  const { organizer: param1, title: param2, date: param3 } = req.query;

  const skip = (page - 1) * limit;
  let query = Event.find();

  if (param1) {
    query = query.where("organizer").equals(param1);
  }

  if (param2) {
    query = query.where("title").equals(param2);
  }

  if (param3) {
    const [startDateStr, endDateStr] = param3.split(",");
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    query = query.where("date").gte(startDate).lte(endDate);
  }
  const totalItem = await Event.countDocuments(query);
  const result = await query.skip(skip).limit(parseInt(limit));

  const events = {
    result,
    totalItem,
  };
  res.json(events);
};
// ***
// *** функция для примера ***
const getFilterEvents = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const { organizer, speciality, period } = req.query;

  //  query = Event.find().where("organizer").equals(param1);
  // query = Event.find().where("speciality").equals(param2);

  const skip = (page - 1) * limit;
  let query = Event.find();

  // Добавляем фильтры, если параметры присутствуют
  if (organizer) {
    query = query.where("organizer").equals(organizer);
  }
  if (speciality) {
    query = query.where("speciality").equals(speciality);
  }
  if (period) {
    const [startDate, endDate] = period;
    query = query.where("date").gte(startDate).lte(endDate);
    // query = (await query.where("date").gte(startDate)).filter(endDate);
  }

  // Получаем общее количество элементов в коллекции
  const totalItem = await Event.countDocuments(query);

  // Получаем результаты с применением .skip() и .limit()
  const result = await query.skip(skip).limit(parseInt(limit));

  res.json({ result, totalItem });
  // *** еще один вариант **
  // Получение отфильтрованной коллекции:
  const filteredItems = await Event.find(/* ваш фильтр */);
  // Здесь { /* ваш фильтр */ } - это объект, в котором вы можете указать условия фильтрации. Если фильтров нет, метод find() вернет все документы в коллекции.

  // Получение количества элементов в отфильтрованной коллекции:
  const filteredItemCount = filteredItems.length;
  console.log(filteredItemCount);
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

  res.status(201).json({ message: "Succeses" });
};

module.exports = {
  getEvents: ctrlWrapper(getEvents),
  getAllEvents: ctrlWrapper(getAllEvents),
  getFilterEvents: ctrlWrapper(getFilterEvents),
  addEvent: ctrlWrapper(addEvent),
  getEventById: ctrlWrapper(getEventById),
  updateEvent: ctrlWrapper(updateEvent),
};
