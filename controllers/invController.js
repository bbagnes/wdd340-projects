const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ****************************************
*  Deliver inventory management view
***************************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: "Vehicle Management", nav, errors: null, classificationSelect})
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
*  Deliver new classification view
* *************************************** */
 invCont.buildAddClassification = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/addclassifcation", {
    title: "Add New Classification", nav, errors: null})
}

/* ****************************************
*  Deliver new vehicle view
* *************************************** */
 invCont.buildAddVehicle = async function(req, res, next) {
  let nav = await utilities.getNav()
  let classList = await utilities.buildClassificationList()
  res.render("./inventory/addvehicle", {
    title: "Add New Vehicle", nav, classList, errors: null})
}

/* ****************************************
*  Process new vehicle Registration
* *************************************** */
invCont.newVehicleRegister = async function (req, res) {
  let nav = await utilities.getNav()
  const { } = req.body
  const regResult = await invModel.registerNewVehicle(
    inv_id,
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

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Modify existing inventory item view
 * ************************** */
invCont.modifyInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/modifyinventory", {
    title: "Modify " + itemName + " Details",
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ****************************************
*  Update Inventory Data
* *************************************** */
invCont.updateInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    inv_id,     
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color,
    classification_id 
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,     
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color,
    classification_id
  )  

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/modifyinventory", {
    title: "Modify " + itemName + " Details",
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

/* ***************************
 *  Delete existing inventory item view
 * ************************** */
invCont.deleteInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/deleteinventory", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price
  })
}

/* ****************************************
*  Delete Inventory Data
* *************************************** */
invCont.deleteInventoryItem = async function (req, res) {
  const inv_id = parseInt(req.params.invId)
  const itemData = await invModel.getInventoryById(inv_id)
  const deleteItem = await invModel.deleteInventoryItem(inv_id);
  let nav = await utilities.getNav()

  if (deleteItem) {
    const itemName = itemData.inv_make + " " + itemData.inv_model
    req.flash("notice", `The ${itemName} was successfully deleted.`)
    res.redirect("/inv/")
  } else {
    const itemName = `${itemData.inv_make} ${itemData.inv_model}`
    req.flash("notice", "Sorry, the deletion failed.")
    res.status(501).render("inventory/deleteinventory", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price
    })
  }
}

module.exports = invCont