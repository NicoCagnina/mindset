const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionsSchema = new Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Clients',
    },
    job: { type: String, required: true },
    description: { type: String, required: true },
    profiles: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Positions', positionsSchema);
