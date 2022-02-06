const Positions = require('../models/Positions');

const getPositions = (req, res) => {
  Positions.find({})
    .populate('clientId', 'customerName')
    .populate('profiles')
    .then((Positions) => {
      res.status(200).json(Positions);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getOnePosition = (req, res) => {
  Positions.findById(req.params.id)
    .populate('clientId', 'customerName')
    .populate('profiles')
    .then((Positions) => {
      if (!Positions) {
        return res.status(404).json({
          msg: `Position with id: ${req.params.id} was not found`,
        });
      }
      return res.status(200).json(Positions);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const updatePosition = (req, res) => {
  Positions.findByIdAndUpdate(
    req.params.id,
    {
      clientId: req.body.clientId,
      job: req.body.job,
      description: req.body.description,
      profiles: req.body.profiles,
    },
    { new: true },
    (error, newPosition) => {
      if (!newPosition) {
        return res.status(404).json({
          msg: `Position with id: ${req.params.id} was not found`,
        });
      }
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(newPosition);
    }
  );
};

const createPosition = (req, res) => {
  const position = new Positions({
    clientId: req.body.clientId,
    job: req.body.job,
    description: req.body.description,
    profiles: req.body.profiles,
  });

  position.save((error, position) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(position);
  });
};

const deletePosition = (req, res) => {
  Positions.findByIdAndRemove(req.params.id, (error, Positions) => {
    if (!Positions) {
      return res.status(404).json({
        msg: `Position with id: ${req.params.id} was not found`,
      });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(Positions);
  });
};

module.exports = {
  getPositions,
  getOnePosition,
  createPosition,
  updatePosition,
  deletePosition,
};
