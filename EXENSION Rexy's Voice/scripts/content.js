var dialog_count = 0
var started = false
var state = false


// document.addEventListener('click', function() {
//     if (state){
//         start()
//         state = false
//     }
// })


setTimeout(() => {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementsByClassName("container-rounded-corner requirmentWrapper");

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList" && !started && mutation.target.className.includes('mat-tab-label') && mutation.addedNodes.length > 0 ) {
            // if (!started) {
                
            console.log(mutation)
            console.log("A child node has been added");
            start()
            started = true
            // }
            // else {
            //     state = true
            // }
          }
  
        }
        started = false
    };
    
    
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(targetNode[0], config);
}, 5000); 

const listenersMap = new WeakMap();

function addClickListener (element) {

    // Check if the element already has a click listener
    if (!listenersMap.has(element)) {

        // Create a click handler
        const clickHandler = () => {
            console.log('Button clicked')

            // Call the main function
            console.log(dialog_count)
            displayReview(dialog_count)
            dialog_count = dialog_count + 1
        };

        // Add the click listener
        element.addEventListener('click', clickHandler);

        // Store the handler
        listenersMap.set(element, clickHandler); // Store the handler
    }
};

function start(){
    setTimeout(() => {
        console.log("started")
        // Grab all the "View Details" buttons
        buttons = document.getElementsByClassName('text-link')

        // Transform the HTMLCollection into an array
        buttons = Array.prototype.slice.call(buttons) 

        // Iterate through the array and add a click listener to each button
        buttons.forEach(button => {
            // addClickListener(button)
            button.addEventListener('click', () => {
                console.log('Button clicked')

                // Call the main function
                console.log(dialog_count)
                displayReview(dialog_count)
                dialog_count = dialog_count + 1
            });
        });
    },2000)

}

async function displayReview(dialog_count){

    // Get the card that is being displayed
    card = document.getElementById(`mat-dialog-${dialog_count}`)

    // Get the top element of the displayed card
    let topElement = card.getElementsByClassName('col-md-12 col-sm-12 col-xs-12 text-right')
    topElement = Array.prototype.slice.call(topElement)
    topElement = topElement[0]


    courseID = card.getElementsByClassName('pl-0')[1].innerText


    let response = await getInfo(courseID)
    let satisfaction_html = ` <h3> Satisfaction Rate:  ${response['averageOverallSatisfaction']}</h3>`;
    let difficulty_html = ` <h3> Difficulty Rate:  ${response['averageDifficulty']} </h3>`;
    let reviews_html = ` <a href="https://rexysvoice.us/"><h2> Check Reviews for this class</h2></a>`;

    // Create a div element for satisfaction rate and append it to the top element
    let satisfaction = document.createElement('div')
    satisfaction.innerHTML = satisfaction_html
    satisfaction.style.marginRight = '12%'
    
    topElement.insertBefore(satisfaction, topElement.firstChild)
    
    // Create a div element for difficulty rate and append it to the top element
    let difficulty = document.createElement('div')
    difficulty.innerHTML = difficulty_html
    difficulty.style.marginRight = '12%'    


    topElement.insertBefore(difficulty, satisfaction)

    // Create a div element for reviews redirect and append it to the top element
    let reviews = document.createElement('div')
    reviews.innerHTML = reviews_html
    reviews.style.display = 'flex'
    reviews.style.justifyContent = 'center'
    reviews.style.alignContent = 'center'


    topElement.insertBefore(reviews, topElement.children[2])

    //Style the top element to give space for the new elements
    topElement.style.display = 'flex'
    topElement.style.justifyContent = 'flex-end'
    topElement.style.margin = 'auto'
    topElement.style.padding = '10px'

    // Give each new element style 
    textContent = topElement.children[0] 
    if (response['averageDifficulty'] <= 2) {
        textContent.style.color = 'green';
    } else if (response['averageDifficulty'] > 2 && response['averageDifficulty'] < 4) {
        textContent.style.color = 'orange';
    } else {
        textContent.style.color = 'red'; // This handles 4 and 5
    }

    
    textContent = topElement.children[1]
    if (response['averageOverallSatisfaction'] <= 2) {
        textContent.style.color = 'red';
    } else if (response['averageOverallSatisfaction'] >= 3 && response['averageOverallSatisfaction'] < 4) {
        textContent.style.color = 'orange';
    } else {
        textContent.style.color = 'green'; // This handles 4 and 5
    } 

}



async function getInfo(courseID){

    courseID = courseID.replace(/\s+/g, "")

    var result = await fetch(`https://rexysvoice.us/getCourseReview?courseID=${courseID}`)

    

    if (!result.ok) {
        console.error("Failed to fetch data:", result.statusText);

        let nullObject = {
            "averageOverallSatisfaction": "N/A",
            "averageDifficulty": "N/A",
        }
        return nullObject; 
    }

    const results = await result.json();


    return results
}
