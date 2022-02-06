 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApplicationsSchema = new Schema(
  {
    positions: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Positions',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Clients',
    },
    postulants: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Postulants',
    },
    result: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Applications', ApplicationsSchema);