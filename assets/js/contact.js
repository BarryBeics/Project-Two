/**
   * Function to send message to email account using emailjs
   */
function sendMail(params) {
    var tempParams = { 
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send('service_qk5l97e', 'template_9bc234k', tempParams)
    .then(function(res){
        console.log("success", res.status);
    })
}

// input fields
const contactName = document.getElementById('name');
const contactEmail = document.getElementById('email');
//const form = document.getElementById('form')
const contactMessage = document.getElementById('message');

//form.addEventListener('submit', (e) => {
 //   let messages = []
  //  if (contactName.value === '' || contactName.value === null) {
  //      messages.push('Name is required')
  //  }

  //  if (contactMessage.value.length <= 20) {
  //      contactMessage.push('Please get a detailed message')
  //  }

   // if (messages.length > 0) {
   //     e.preventDefault()
   //     errorElement.innerText = messages.join(', ')
  //  }
//})


function validateForm() {
  if (contactName.value === "" || contactName.value === null) {
      alert("Please ensure you add your name to the form");
       return false;
   } else if (contactEmail.value === "" || contactEmail.value === null) {
       alert("Please add you email address");
       return false;
    } else if (contactMessage.value === "" || contactMessage.value === null) {
        alert("Please add your comment");
        return false;
  } else {
       sendMail(); 
       alert("Thank you for getting in conatct");
       location.reload()
      }
  };

