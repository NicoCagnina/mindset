const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const required = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({ message: 'Email is required' });
  }
  if (!req.body.email.match(emailRegex)) {
    return res.status(400).json({ message: 'Email is wrong' });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: 'Password is required' });
  }
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ message: 'Password minimum length is 8 characters' });
  }
  return next();
};

module.exports = {
  required,
};
