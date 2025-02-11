
---

# Rexy's Voice - BYUI Course Rating Platform

Rexy's Voice is a web application developed during a hackathon by a group of students to help students at BYU-Idaho (BYUI) rate and review their classes. The platform allows users to share their experiences with courses they've taken, providing valuable insights for prospective students to make more informed decisions about their class schedules. A Chrome extension was also built to display average ratings directly on the school's course planning website.

---

## Key Features

- **Course Ratings**: Students can rate the classes they've taken based on several factors such as grade earned, satisfaction, hours spent per week, and class difficulty.
- **Review Details**: Reviews allow students to indicate the professor they had, the grade they earned, the hours they spent on the course, and their overall satisfaction with the class.
- **Search and Similar Classes**: Users can search for specific classes and get a list of similar classes based on the course ratings and average difficulty.
- **Class Averages**: View the average difficulty score and average satisfaction rating for each class to help gauge how intense or enjoyable a class might be.
- **Chrome Extension**: A Chrome extension is available to display the course averages directly on BYUI's class planning website, allowing students to easily make informed decisions while registering for courses.

---

## Problem We’re Solving

When registering for classes at BYUI, students often face a situation where the course descriptions provide general information, but the actual content and difficulty of the class can be quite different. Many times, students end up feeling disappointed or unprepared because the class did not meet their expectations.

Additionally, students sometimes sign up for what they believe will be an "easy" elective, only to discover that it’s much harder than anticipated. We created Rexy's voice to provide transparency and give students the ability to make better decisions about their classes based on reviews and ratings from those who have already taken them.

---

## How It Works

1. **Create a Review**: Students can log in and submit reviews for the classes they have completed. Reviews include:
   - **Professor Name**: Specify the professor who taught the class.
   - **Grade**: Indicate the grade earned in the course.
   - **Satisfaction**: Rate how satisfied they were with the class overall.
   - **Weekly Hours**: Report the number of hours spent on the course per week.
   - **Difficulty**: Provide a difficulty score based on their experience.

2. **View Course Information**: On each class’s page, users can view the ratings, difficulty, and satisfaction averages, helping them make informed decisions about enrolling in the course.

3. **Search for Courses**: Users can search for any course offered at BYUI and see related courses, class ratings, difficulty, and satisfaction averages.

4. **Chrome Extension**: The Chrome extension allows students to view these averages directly on BYUI’s class planning website. As they browse available courses, they’ll see how other students have rated them, making it easier to choose classes based on their preferences.

---

## Installation


### Chrome Extension

1. Clone the repository or download the extension files.
2. Open Chrome, go to the `chrome://extensions` page.
3. Enable **Developer mode** and click **Load unpacked**.
4. Select the folder containing the extension files and it will be added to your browser.

---

## Technologies Used

- **MongoDB**: A NoSQL database for storing reviews, course data, and user information.
- **Express.js**: A web framework for building the backend API.
- **Node.js**: The runtime environment for running the backend server.
- **Chrome Extensions API**: For building the Chrome extension to display course ratings directly on BYUI’s course planning website.
- 
---


