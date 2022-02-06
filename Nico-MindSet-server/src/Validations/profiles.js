const missingInputs = (req, res, next) => {
    var name = branch = description = "";
    var okey = true;
    if (!req.body.profileName) {
      name = 'name, '
      okey= false
    }
    if (!req.body.branch) {
      branch = 'branch, '
      okey=false
    }
    if (!req.body.description) {
      description = 'description, '
      okey = false
    }
    if (!okey){ 
      res.status(400).send({ msg: name + branch + description + 'are missing'})
    }
    next()
  }
module.exports = {missingInputs}
