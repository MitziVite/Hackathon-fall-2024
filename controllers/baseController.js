const baseController = {}
const Review = require("../models/reviewModel")
const Util = require("../utilities/index")


baseController.buildHome = async function(req, res, next) {
    try {
      // req.flash('message', 'Welcome to our website')
      const errors = req.session.errors || null;
      req.session.errors = null; 
      res.render("index", { title: "Search for Courses", errors, isHomePage: req.path === '/'});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
};

// This function creates the view for the about page
baseController.buildDetails = async function(req, res, next) {
  try{
    const review = new Review();
    const ccid = req.query.courseCode.toUpperCase().replace(" ", "")
    
    var ans = await review.getClassesWithReviews(ccid);
    const clos = ans[0]['outcomes']
    var closHTML = (clos)? Util.createOutcomes(clos) : ""
    var reviews = await Util.getReviews(ans[0]['reviews'])
    res.render("about", { 
      isHomePage: null,
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
    console.log(error)
    req.flash('warning', "Course not found")
    res.status = 404;
    next(new Error("We currently don't have the class you are looking for"));
  }

}

baseController.buildForm = async function(req, res, next) {
    try{
      let errors = req.session.errors || null;
      res.render("forms/rateClassForm", { isHomePage: null, title: "Rate your class", errors});
    } catch (error) {
      console.error("Error:", error);
      next(new Error("Error Rendering"));
    }
  
}

baseController.searchResults = async function(req, res, next){
  try{
    const ccid = req.query.courseCode.toUpperCase()
    const review = new Review(); 
    let similarClasses = await review.getSimilarClassesByName(ccid)

    const cleanedArray = similarClasses.map((course) => {return {'courseCode': course['__catalogCourseId'], 'courseName': course['title']}})
    const coursesComponent = await Util.createSimilarCourses(cleanedArray)
    res.render("search/searchResults", {title: "Search results", courses: coursesComponent, isHomePage: null})
  }
  catch (error) {
  console.log(error)
  req.flash('warning', "Course not found")
  res.status = 404;
  next(new Error("We currently don't have the class you are looking for, verify the information provided an try again"));
  }
}

module.exports = baseController;
