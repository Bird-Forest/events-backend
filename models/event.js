const { Schema, model } = require("mongoose");
// const Joi = require("joi");
const { validateMongoose } = require("../middlewares");
// const { validateMongoose } = require("../middlewares/index");

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  radio: {
    type: String,
    required: true,
  },
});

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    participants: {
      type: [usersSchema],
      default: undefined,
    },
    web: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.post("save", validateMongoose);

const Event = model("event", eventSchema);

module.exports = {
  Event,
};
