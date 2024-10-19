// const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res, next) {
    try {
      const nav = `<p>Hola</p>`;
      res.render("index", { title: "Home", nav });
    } catch (error) {
      console.error("Error fetching nav:", error);
      next(new Error("Error fetching navigation"));
    }
  };
  

module.exports = baseController;
