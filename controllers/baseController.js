const baseController = {}
const Review = require("../models/reviewModel")
const Util = require("../utilities/index")


baseController.buildHome = async function(req, res, next) {
    try {
      req.flash('message', 'Welcome to our website')
      const errors = req.session.errors || null;
      req.session.errors = null; 
      res.render("index", { title: "Search for Courses", errors});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
};

// This function creates the view for the about page
baseController.buildDetails = async function(req, res, next) {
  try{
    const review = new Review();
    const ccid = req.query.courseCode.toUpperCase()
    
    var ans = await review.getClassesWithReviews(ccid);
    const clos = ans[0]['outcomes']
 
    var closHTML = Util.createOutcomes(clos)
    var reviews = await Util.getReviews(ccid)
    res.render("about", { 
      title: ans[0]['title'],
      ccid,
      description: ans[0]['description'],
      audit: ans[0]['disallowAudit2'],
      credits: ans[0]['credits']['value'],
      department: ans[0]['department']['name'],
      prereq: ans[0]['prerequisites'],
      clos: closHTML,
      reviews

    });
  } catch (error) {
    req.flash('warning', "We currently don't have the class you are looking for")
    console.error("Error:", error);
    next(new Error("Error Rendering"));
  }

}

baseController.buildForm = async function(req, res, next) {
    try{
      let errors = req.session.errors || null;
      res.render("forms/rateClassForm", { title: "Rate your class", errors});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
  
}


module.exports = baseController;
