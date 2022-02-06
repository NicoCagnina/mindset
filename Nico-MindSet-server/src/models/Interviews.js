const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    lowercase: true,
    ref: "Positions",
  },
  postulantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    lowercase: true,
    ref: "Postulants",
  },
  dateTime: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "cancelled", "next step", "finished"],
    lowercase: true,
    required: true,
  },
});

module.exports = mongoose.model("Interviews", InterviewSchema);
