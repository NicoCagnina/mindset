const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionsSchema = new Schema(
  {
    psychology: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Psychologists',
    },
    postulant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Postulants',
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ['cancelled', 'assigned', 'successful'],
      default: 'assigned',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sessions', SessionsSchema);
