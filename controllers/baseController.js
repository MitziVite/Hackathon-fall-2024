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

// baseController.searchResults = async function(req, res, next){
//   try{
//     const ccid = req.query.courseCode.toUpperCase()
//     const review = new Review(); 
//     let similarClasses = await review.getSimilarClassesByName(ccid)

//     const cleanedArray = similarClasses.map((course) => {return {'courseCode': course['__catalogCourseId'], 'courseName': course['title']}})
//     const coursesComponent = await Util.createSimilarCourses(cleanedArray)
//     res.render("search/searchResults", {title: "Search results", courses: coursesComponent, isHomePage: null})
//   }
//   catch (error) {
//   console.log(error)
//   req.flash('warning', "Course not found")
//   res.status = 404;
//   next(new Error("We currently don't have the class you are looking for, verify the information provided an try again"));
//   }
// }

baseController.searchResults = async function(req, res, next) {
  try {
    const searchQuery = req.query.courseCode.trim().toUpperCase();
    const review = new Review();
    let results = [];

    // Check if the search query is a full course code (e.g., "CS101")
    if (/^[A-Za-z]+\s?\d+$/.test(searchQuery)) { 
      // Exact match: Redirect to course details
      return res.redirect(`about/course?courseCode=${searchQuery}`);
    } 

    // If it's a partial course code (e.g., "CS"), look for similar codes
    if (/^[A-Za-z]{3-5}+$/.test(searchQuery)) {
      results = await review.getSimilarClassesByCode(searchQuery);
    } 
    // If it's not a course code, assume it's a course name
    else {
      results = await review.getSimilarClassesByName(searchQuery);
    }

    // Process and display search results
    if (results.length > 0) {
      const cleanedArray = results.map(course => ({
        courseCode: course['__catalogCourseId'],
        courseName: course['title']
      }));

      const coursesComponent = await Util.createSimilarCourses(cleanedArray);
      return res.render("search/searchResults", {
        title: "Search Results",
        courses: coursesComponent,
        isHomePage: null
      });
    }

    // If no results found, handle error
    req.flash('warning', "Course not found");
    res.status(404);
    next(new Error("We currently don't have the class you are looking for. Verify the information provided and try again."));
  } catch (error) {
    console.error(error);
    req.flash('warning', "Something went wrong with your search.");
    res.status = 404;
    next(new Error("An error occurred while processing your search."));
  }
};

baseController.buildFeedbackForm = async function (req, res, next) {
  try{
    let errors = req.session.errors || null;
    res.render("forms/feedback", { isHomePage: null, title: "Feedback", errors});
  } catch (error) {
    console.error("Error:", error);
    next(new Error("Error Rendering"));
  }
}


module.exports = baseController;
