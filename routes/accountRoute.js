// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const accountValidate = require("../utilities/account-validation")

// Route to build Login form by Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

//Route to build registration form by registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

//Route to build account management view
router.get("/", utilities.handleErrors(accountController.buildManagementView));

//Route to validate and store registration form information into the account table in the database
router.post(
    "/register",
    accountValidate.registationRules(),
    accountValidate.checkRegData,
    utilities.handleErrors(accountController.accountRegister)
)

// Process the login attempt
router.post(
  "/login",
  accountValidate.loginRules(),
  accountValidate.checkloginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;