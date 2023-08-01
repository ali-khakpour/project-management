const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const SECRET = "aa22lskddkirgoironanruwopnvnvso"

function hashPassword(str) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(str, salt)
}
function verifyPassword(str, hashed) {
    return bcrypt.compareSync(str, hashed)
}

 function singToken(payload) {
    return token =  jwt.sign(payload, SECRET, {expiresIn : "2d"})
}
 function verifyToken(payload, SECRET) {

    return token =  jwt.verify(payload, SECRET)
}


module.exports = {
    hashPassword,
    verifyPassword,
    singToken,
    verifyToken
}