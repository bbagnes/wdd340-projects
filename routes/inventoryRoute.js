// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view.
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory by classification view.
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));

//Route to build the inventory management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

//Route to edit vehicles selected by classification in management view
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//Route to build the new classifcation view.
router.get("/inv/addclassification", utilities.handleErrors(invController.buildAddClassification));

// //Route to process and add a new Classification to database.
// router.post(
//     "/addClassification",
//     invValidate.newClassificationRules(),
//     invValidate.checkAddClassificationData,
//     utilities.handleErrors(invController.addClassificationRegister)
// );

//Route to build the add new vehicle view
router.get("/addVehicle", utilities.handleErrors(invController.buildAddVehicle));

// //Route to process and add a new vehicle to the database
// router.post(
//     "/addVehicle",
//     invValidate.newVehicleRules(),
//     invValidate.checkAddVehicleData,
//     utilities.handleErrors(invController.newVehicleRegister)
// );

module.exports = router;