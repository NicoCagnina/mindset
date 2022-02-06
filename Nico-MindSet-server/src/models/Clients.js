const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientsSchema = new Schema({
  customerName: {type: String, required: true},
  branch: {type: String, required: true},
  phone: {type: Number, required: true},
  email: {type:String, required: true},
  description: {type:String, required: true}
})

module.exports = mongoose.model("Clients",clientsSchema)