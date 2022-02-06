const fs = require('fs')

const validateSessionCreation = (req,res,next) => {
  let psy = post = date = time = stat = "";
  let okey = true;
  if (!req.body.psychology) {
    psy = 'psychologyId, '
    okey = false
  }
  if (!req.body.postulant) {
    post = 'postulantId, '
    okey = false
  }
  if (!req.body.date) {
    date = 'date, '
    okey = false
  }
  if (!req.body.time) {
    time = 'time, '
    okey = false
  }
  if (!req.body.stat) {
    stat = 'status, '
    okey = false
  }
  if (!okey){ 
    res.status(400).send({ msg: psy + post + date + time + stat + 'missing'})
  }
  next()
}

const validateTimeOfSession = (req,res,next) => {
  let twentyFourHourClock = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
  if (!twentyFourHourClock.test(req.body.time)){
    return res.status(400).send({msg: 'wrong time format'})
  }
  next()
}

module.exports = {
  validateSessionCreation,
  validateTimeOfSession
  }