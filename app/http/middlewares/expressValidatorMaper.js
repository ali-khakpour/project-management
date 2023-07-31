const { validationResult } = require("express-validator");

function expressValidatorMaper(req, res, next) {
  const message = {};
  const result = validationResult(req);
//   res.send(result)
  if (result?.errors?.length > 0) {
    result.errors.forEach((err) => {
      message[err.path] = err.msg;
    });
    return res.json({
      status : 400 , 
       message
    });
  }
  next();
}

module.exports = expressValidatorMaper
