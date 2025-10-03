const utilities = require("../utilities/")
const invModel = require("../models/inventory-model")

/* ****************************************
*  Deliver a Server Failure 500 Error management view
***************************************** */
 async function buildServerErrorView(req, res, next) {
  let nav = await utilities.getNav()
  const serverError = await invModel.getInventoryById(0);
  res.render("/errors/error", {
    title: "Generated Error", nav, serverError, errors: null})
}

module.exports = { buildServerErrorView }
