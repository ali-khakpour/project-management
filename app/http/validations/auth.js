const { body } = require("express-validator");
const { UserModle } = require("../../models/user");

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

module.exports = registerValidator;
