const baseController = {}

baseController.buildHome = async function(req, res, next) {
    try {
      res.render("index", { title: "Search for Courses"});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
};

// This function creates the view for the about page
baseController.buildDetails = async function(req, res, next) {
  try{
    res.render("about", { title: "About *Insert CourseID here*"});
  } catch (error) {
    console.error("Error:", error);
    next(new Error("Error Rendering"));
  }

}


module.exports = baseController;
