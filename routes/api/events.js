const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/ctrlEvents");
const { isValidId } = require("../../middlewares");
// const { schemas } = require("../../models/event");

router.post("/", ctrl.addEvent);
router.get("/all", ctrl.getAllEvents);
router.get("/", ctrl.getEvents);
router.get("/:id", isValidId, ctrl.getEventById);
router.put(
  "/:id",
  isValidId,
  // validateBody(schemas.updateSchema),
  ctrl.updateEvent
);

module.exports = router;
