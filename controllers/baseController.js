const baseController = {}
const Review = require("../models/reviewModel")


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
    const review = new Review();
    const ccid = req.params.ccid.toUpperCase();
    
    ans = await review.getClassesWithReviews(ccid);
    console.log(ans[0]
    )
    res.render("about", { 
      title: ans[0]['title'],
      ccid,
      description: ans[0]['description'],
      audit: ans[0]['disallowAudit2'],
      credits: ans[0]['credits']['value'],
      department: ans[0]['department']['name'],
      prereq: ans[0]['prerequisites']

    });
  } catch (error) {
    console.error("Error:", error);
    next(new Error("Error Rendering"));
  }

}

baseController.buildForm = async function(req, res, next) {
    try{
      res.render("forms/rateClassForm", { title: "About *Insert CourseID here*"});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
  
  }


module.exports = baseController;
