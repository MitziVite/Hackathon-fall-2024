const baseController = {}

baseController.buildHome = async function(req, res, next) {
    try {
      res.render("index", { title: "Search for Courses"});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
  };
  
baseController.buildDetails = async function(req, res, next) {
  try{
    res.render("about", { title: "About *Insert CourseID here*"});
  } catch (error) {
    console.error("Error:", error);
    next(new Error("Error Rendering"));
  }

}


module.exports = baseController;
