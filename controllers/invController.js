const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ****************************************
*  Deliver inventory management view
***************************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management", nav, errors: null})
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles", nav, grid, errors: null})
}

/* ***************************
 *  Build inventory by vehicle view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId
  const vehicle= await invModel.getInventoryById(inv_id);
  const grid = await utilities.buildVehicleGrid(vehicle);
  let nav = await utilities.getNav();
  const vehicleTitle = vehicle.inv_year + " " + vehicle.inv_make + " " + vehicle.inv_model;
  res.render("./inventory/vehicle", {
    title: vehicleTitle, nav, grid, errors: null})
}

/* ****************************************
*  Deliver new classifiaction view
* *************************************** */
 invCont.buildAddClassifcation = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/addclassifcation", {
    title: "Add New Classification", nav, errors: null})
}

/* ****************************************
*  Deliver new vehicle view
* *************************************** */
 invCont.buildAddVehicle = async function(req, res, next) {
  let nav = await utilities.getNav()
  let classList = await utilities.buildClassificationList()
  res.render("inventory/addvehicle", {
    title: "Add New Vehicle", nav, classList, errors: null})
}

/* ****************************************
*  Process new vehicle Registration
* *************************************** */
invCont.newVehicleRegister = async function (req, res) {
  let nav = await utilities.getNav()
  const { } = req.body
  const regResult = await invModel.registerNewVehicle(
    classification_id, 
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color
  )  

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, the ${inv_make} ${inv_model} was sucessfully added.`
    )
    res.status(201).render("/inventory/management", {
      title: "Vehicle Management", nav, errors: null, })
  } else {
    req.flash("notice", "Sorry, the vehicle registration failed.")
    res.status(501).render("inventory/addvehicle", {
      title: "Add New Vehicle", nav, errors: null, })
  }
}


module.exports = invCont