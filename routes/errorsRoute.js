// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const errorsController = require("../controllers/errorsController")

//Route to build account management view
router.get("/", utilities.handleErrors(errorsController.buildServerErrorView));

module.exports = router;