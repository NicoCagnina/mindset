const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema ({
    profileName: {type: String, lowercase: true, required: true},
    branch: {type: String, lowercase: true, required: true},
    description: {type: String, lowercase: true, required: true},
})

module.exports = mongoose.model("Profile", ProfileSchema)