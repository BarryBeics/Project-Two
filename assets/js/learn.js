// Set up a single handler at a common ancestor of all the select elements
document.body.addEventListener("change", function(event){
    // event.target references the element that actually triggered the event
    // Check to see if the event was triggered by a DOM element you care to handle
    if(event.target.classList.contains("select")){
      // Access the <p> element that is the previous sibling to the 
      // select that triggered the event and update it
      event.target.previousElementSibling.textContent = event.target.value
    }
  });


  // Wait for the DOM to finish loading before taking values from the inputs
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            console.log(button);
             if (this.getAttribute("data-type") === "submit") {
                validateInputs();
            } else {
                
                alert(`nope`);
            }
        });
    }

    

});


/**
 * Checks the sum value of all the inputs and displays an alert to help with debuging
 */
function validateInputs() {
    
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert(" Hey! You got it right! ");
    } else {
        alert('Something doesnt add up here!');
    }

   

}

/**
 * Gets the values from the various input types and checks they add up
 * Adding up the sum of each allows us to besure all awil be sent to the script 
 */
function calculateCorrectAnswer() {
    
    let stake = parseInt(document.getElementById('stake').value);
    let takeProfit = parseInt(document.getElementById('takeProfit').innerText);
    let tradingFee = parseInt(document.getElementById('tradingFee').innerText);
    let operator = "+";

    if (operator === "+") {
        return [stake + takeProfit + tradingFee, "addition"];
    } else {
        alert(`aey!`);
        
    }

}



