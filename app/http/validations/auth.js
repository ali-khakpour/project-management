const { body } = require("express-validator");
const { UserModle } = require("../../models/user");
const { verifyPassword } = require("../../modules/hashPassword");

function registerValidator() {
  return [
    body("username")
      .isLength({ min: 4, max: 25 })
      .custom(async (value, ext) => {
        if (value) {
          const userRegex = /^[a-z]+[a-z0-9\_\.]{3,}/gi;
          if (userRegex.test(value)) {
            const user = await UserModle.findOne({username : value})
            if(user) throw "نام کاربری از قبل موجود است"
            return true;
          } else {
            throw "نام کاربری صحیح نمی باشد";
          }
        } else {
          throw "نام کاربری نمی تواند خالی باشد";
        }
      }),
    body("email").isEmail().withMessage("ایمیل وارد  شده صحیح نمی باشد").custom(async (value)=>{
      const user = await UserModle.findOne({email : value})
      if(user) throw "ایمیل از قبل موجود است";
      return true
    }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage(" شماره موبایل وارده شده صحیح نمی باشد").custom(async (value)=>{
        const user = await UserModle.findOne({mobile : value})
        if(user) throw "شماره موبایل از قبل موجود است";
        return true
      }),

    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("رمز بین 8 تا 16 نویسه باشد")
      .custom((value, ctx) => {
        console.log(value, ctx.req.body.confirmPassword );
        if (!value) throw "رمز نمیتواند خالی باشد";
        
        if (value !== ctx.req.body.confirmPassword) {
          throw "رمز با تکرارش یکی نیست";
        } 
        return true
      }),
  ];
}

function loginValidator() {
  return [
    body("username").notEmpty().withMessage("نام کاربری نمی تواند خالی باشد")
      .custom(async (value, ext) => {
        if (value) {
            const user = await UserModle.findOne({username: value})
            console.log(user);
            if(!user) throw "نام کاربری یا رمز عبور اشتباه است"
            return true;
          } else {
            throw "نام کاربری صحیح نمی باشد";
          }
        
      }),

    body("password")
      .notEmpty()
      .withMessage("رمز بین 8 تا 16 نویسه باشد")
      .custom( async (value, ctx) => {
        if (!value) throw "رمز نمیتواند خالی باشد";
        const hashed = await UserModle.findOne({username: ctx.req.body.username})
        const verify = verifyPassword(value, hashed.password )
        if (!verify) throw {status : 401, message : "نام کاربری یا رمز ورود اشتباه است"};
        return true
      }),
  ];
}

module.exports = {registerValidator, loginValidator};
