//send email and password to backend
let email_element = document.getElementById('email');
let password_element = document.getElementById('password');
let btn_element = document.getElementById('btn');

function validate_email(email){
    let domain = "gmail";
    let regex = new RegExp(`^[A-Za-z0-9._%+-]+@${domain}\\.com$`);

    if(regex.test(email)){
        console.log("Valid email");
        return true;
    }else{
        console.log("Invalid email");
        shake(email_element);
        return false;
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

    //minor email check
    validate_email(email);

    //parse  from  string to object
    let storedUser = JSON.parse(localStorage.getItem('user'));

   //validate email
    if(!validate_email(email)) return;
    
    //check if email and password are the same
    if((storedUser.email == email)&& (storedUser.password == password)){
        console.log('Access Granted');
        window.location.href = '../HTML/main.html';
    }else{
        shake(email_element);
        shake(password_element);
        console.log("Invalid email or password");
    }

   
})

