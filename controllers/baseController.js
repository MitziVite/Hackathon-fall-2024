const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("index", { title: "Home", nav });
  } catch (error) {
    console.error("Error fetching nav:", error);
    const err = new Error("Error fetching navigation");
    err.status = 404;
    next(err);
  }
}

module.exports = baseController;
