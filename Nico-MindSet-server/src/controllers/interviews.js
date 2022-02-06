const Interviews = require("../models/Interviews");

const getInterviews = (req, res) => {
  Interviews.find()
    .populate("postulantId")
    .populate("positionId")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const getOneInterview = (req, res) => {
  Interviews.find({ _id: req.params.id })
    .populate("postulantId")
    .populate("positionId")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json({
        msg: `No interview with the Id of ${req.params.id}`,
        error,
      });
    });
};

const createInterview = (req, res) => {
  const interview = new Interviews({
    positionId: req.body.positionId,
    postulantId: req.body.postulantId,
    dateTime: req.body.dateTime,
    status: req.body.status,
  });
  interview.save((error, interview) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(interview);
  });
};

const deleteInterview = (req, res) => {
  Interviews.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Interview with id: ${req.params.id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const editInterview = (req, res) => {
  Interviews.findByIdAndUpdate(
    req.params.id,
    {
      postulantId: req.body.postulantId,
      positionId: req.body.positionId,
      dateTime: req.body.dateTime,
      status: req.body.status,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Interview with id: ${req.params.id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

module.exports = {
  getInterviews,
  getOneInterview,
  createInterview,
  deleteInterview,
  editInterview,
};
