const missingInputs = (req, res, next) => {
  let firstName =
    (userName =
    email =
    birthDate =
    street =
    streetNumber =
    city =
    postalCode =
    province =
    country =
    telephone =
    experience =
      '');
  let okey = true;
  if (!req.body.firstName) {
    firstName = 'first name, ';
    okey = false;
  }
  if (!req.body.lastName) {
    lastName = 'last name, ';
    okey = false;
  }
  if (!req.body.userName) {
    userName = 'user name, ';
    okey = false;
  }
  if (!req.body.email) {
    emial = 'email, ';
    okey = false;
  }
  if (!req.body.birthDate) {
    birthDate = 'birth date, ';
    okey = false;
  }
  if (!req.body.street) {
    street = 'street, ';
    okey = false;
  }
  if (!req.body.streetNumber) {
    streetNumber = 'street number, ';
    okey = false;
  }
  if (!req.body.city) {
    city = 'ciry, ';
    okey = false;
  }
  if (!req.body.postalCode) {
    postalCode = 'postal code, ';
    okey = false;
  }
  if (!req.body.province) {
    province = 'province, ';
    okey = false;
  }
  if (!req.body.country) {
    country = 'country, ';
    okey = false;
  }
  if (!req.body.telephone) {
    telephone = 'telephone ';
    okey = false;
  }
  if (!req.body.experience) {
    experience = 'experience, ';
    okey = false;
  }
  if (!req.body.studies) {
    experience = 'studies, ';
    okey = false;
  }
  if (!okey) {
    res
      .status(400)
      .send({
        msg:
          firstName +
          userName +
          email +
          birthDate +
          street +
          streetNumber +
          city +
          postalCode +
          province +
          country +
          telephone +
          experience +
          'are missing',
      });
  }
  next();
};

module.exports = { missingInputs };
