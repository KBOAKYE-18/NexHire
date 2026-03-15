//send email and password to backend
let email_element = document.getElementById('email');
let password_element = document.getElementById('password');
let btn_element = document.getElementById('btn');

function validate_email(email){
    let domain = "gmail";
    let regex = new RegExp(`^[A-Za-z0-9._%+-]+@${domain}\\.com$`);

    if(regex.test(email)){
        console.log("Valid email");
    }else{
        console.log("Invalid email");
        shake(email_element);
        return;
    }
    
}


function shake(element) {
    element.classList.add("shake");

    setTimeout(() => {
        element.classList.remove("shake");
    }, 500);

}

btn_element.addEventListener('click',()=>{
    let email = email_element.value;
    let password = password_element.value;

    //minor email 
    validate_email(email);

    let storedEmail = localStorage.getItem('email');
    let storedPassword = localStorage.getItem('password');
  
    if(storedEmail == email && storedPassword == password){
        console.log('Access Granted');
        window.location.href = '../HTML/main.html';
    }else{
        shake(email);
        shake(password);
    }

   
})

