// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/account-validation")

// Route to build inventory by classification view.
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by classification view.
router.get("/detail/:invId", invController.buildByInventoryId);

//Route to build the inventory management view
router.get("site-name/inv", utilities.handleErrors(invController.buildManagementView));

// //Route to build the new classifcation view.
// route.get("/addClassification", invController.buildAddClassifcation)

// //Route to process and add a new Classification to database.
// router.post(
//     "/addClassification",
//     invValidate.addclassifcationRules(),
//     invValidate.checkAddClassificationData,
//     utilities.handleErrors(invController.addClassificationRegister)
// )

// //Route to build the add new vehicle view
// route.get("/addVehicle", invController.buildAddVehicle);

// //Route to process and add a new vehicle to the database
// router.post(
//     "/addVehicle",
//     invValidate.addVehicleRules(),
//     invValidate.checkAddVehicleData,
//     utilities.handleErrors(invController.addVehicleRegister)
// )

module.exports = router;