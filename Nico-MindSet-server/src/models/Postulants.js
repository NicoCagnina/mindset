const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  jobPosition: { type: String, lowercase: true, required: true },
  employer: { type: String, lowercase: true, required: true },
  startDate: { type: String, lowercase: true, required: true },
  endDate: { type: String, lowercase: true, required: true },
  description: { type: String, lowercase: true, required: true },
});

const PostulantsSchema = new Schema(
  {
    firebaseUID: { type: String },
    firstName: { type: String, lowercase: true, required: true },
    lastName: { type: String, lowercase: true, required: true },
    userName: { type: String, lowercase: true, required: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, lowercase: true, required: true },
    birthDate: { type: String, lowercase: true, required: true },
    street: { type: String, lowercase: true, required: true },
    streetNumber: { type: String, lowercase: true, required: true },
    city: { type: String, lowercase: true, required: true },
    postalCode: { type: String, lowercase: true, required: true },
    province: { type: String, lowercase: true, required: true },
    country: { type: String, lowercase: true, required: true },
    telephone: { type: String, lowercase: true, required: true },
    availability: { type: Boolean },
    contactRange: {
      from: { type: String },
      to: { type: String },
    },
    profiles: [
      {
        profile: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Profile',
        },
        _id: false,
      },
    ],
    studies: {
      primaryStudies: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        school: { type: String, required: true },
      },
      secondaryStudies: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        school: { type: String, required: true },
      },
      tertiaryStudies: [
        {
          startDate: { type: Date },
          endDate: { type: Date },
          description: { type: String },
          institute: { type: String },
          _id: false,
        },
      ],
      universityStudies: [
        {
          startDate: { type: Date },
          endDate: { type: Date },
          description: { type: String },
          institute: { type: String },
          _id: false,
        },
      ],
      informalStudies: [
        {
          startDate: { type: Date },
          endDate: { type: Date },
          description: { type: String },
          institute: { type: String },
          _id: false,
        },
      ],
    },
    experience: [experienceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Postulants', PostulantsSchema);
