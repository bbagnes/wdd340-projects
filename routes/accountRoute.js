// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Route to build Login form by Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

//Route to build registration form by registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

//Route to validate and store registration form information into the account table in the database
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;