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

//Route for view to allow the modification of inventory items
router.get("/modify/:invId", utilities.handleErrors(invController.modifyInventoryView));

//Route to modify existing inventory items
router.post("/update/", utilities.handleErrors(invController.updateInventory));

//Route to delete an item from inventory view
router.get("/delete/:invId", utilities.handleErrors(invController.deleteInventoryView));

//Route to delete a selected inventory item form the database
router.post("/delete", utilities.handleErrors(invController.deleteInventoryItem));

//Route to edit vehicles selected by classification in management view
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//Route to build the new classifcation view.
router.get("/addclassification", utilities.handleErrors(invController.buildAddClassification));

// //Route to process and add a new Classification to database.
// router.post(
//     "/addclassification",
//     utilities.newClassificationRules(),
//     invValidate.checkAddClassificationData,
//     utilities.handleErrors(invController.newClassificationRegister)
// );

//Route to build the add new vehicle view
router.get("/addvehicle", utilities.handleErrors(invController.buildAddVehicle));

// //Route to process and add a new vehicle to the database
// router.post(
//     "/addvehicle",
//     invValidate.newVehicleRules(),
//     invValidate.checkAddVehicleData,
//     utilities.handleErrors(invController.newVehicleRegister)
// );

module.exports = router;