const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
*  New Vehicle Registration Validation Rules
* ********************************* */
validate.newVehicleRules = () => {
    return [
      
      //model is required and must be a string
      body("classification_id")
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please select a classification."),

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
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a valid classification name.")
    ]
}

  /* ******************************
 * Check new Classification data and return errors or continue to registration
 * ***************************** */
validate.checkAddClassificationData = async (req, res, next) => {
  const classification_id = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inv", {
      errors,
      title: "Registration",
      nav,
      
    })
    return
  }
  next()
}

/* ******************************
 * Check new Vehicle data and return errors or continue to login
 * ***************************** */
validate.checkAddVehicleData = async (req, res, next) => {
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