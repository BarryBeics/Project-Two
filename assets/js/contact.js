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