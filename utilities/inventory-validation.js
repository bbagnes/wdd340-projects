const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
*  New Vehicle Registration Validation Rules
* ********************************* */
validate.newVehicleRules = () => {
    return [
      // model is required and must be a string
      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a model name."), // on error this message is sent.
  
      // Make is required and must be string
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // A vehicel description is required and must be a string
      body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({min: 1})
      .withMessage("Please provide a vehicle description."),

      // Make is required and must be string
      body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide the sell price."), // on error this message is sent.

      // Make is required and must be string
      body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isNumeric()
        .isLength(4)
        .withMessage("Please provide the vehicle year."), // on error this message is sent.
      
        // Make is required and must be string
      body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isNumeric()
        .isLength({ min: 1})
        .withMessage("Please provide the vehicle mileage."), // on error this message is sent.

      // Make is required and must be string
      body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide the vehicle color."), // on error this message is sent.
    ]
}

/*  **********************************
  *  New Classification Validation Rules
  * ********************************* */
  validate.newClassificationRules = () => {
    return [     
      // valid email is required and cannot already exist in the DB
      body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
          const emailExists = await accountModel.checkExistingEmail(account_email)
          if (!emailExists){
          throw new Error("Invalid Entry. Please use a valid email or Register a new account.")
        }
      }),
  
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
}

  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const {  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkloginData = async (req, res, next) => {
  const account_email = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }
  next()
}

module.exports = validate