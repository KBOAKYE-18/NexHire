let f_name_element = document.querySelector('.fname_element');
let l_name_element = document.querySelector('.lname_element');
let email_element = document.querySelector('.email_element');
let btn = document.getElementById('log_in');
let password_element = document.querySelector('.password');
let p_num_element = document.querySelector('.phoneNumber');

//User class for making credebtials compact for localStorage
class User{
    constructor(email,password,first_name,last_name,phone_number){
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
    }
}

function validate_email(email){
    let domain = "gmail";
    let regex = new RegExp(`^[A-Za-z0-9._%+-]+@${domain}\\.com$`);

    if(regex.test(email)){
        return true;
    }else{
        return false;
    }
    
}

function validate_password(password){
   
    let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$");

    if(regex.test(password)){
        return true;
    }else{
        return false;
    }
    
}


function convertToString(user) {
    return JSON.stringify(user);
}

function shake(element) {
    element.classList.add("shake");

    setTimeout(() => {
        element.classList.remove("shake");
    }, 500);

}


btn.addEventListener('click',()=>{
    let email = email_element.value;
    let password = password_element.value;
    let first_name = f_name_element.value;
    let last_name = l_name_element.value;
    let phone_number = p_num_element.value;


    let emailValid = validate_email(email);
    let passwordValid = validate_password(password);

    if(!emailValid){
        shake(email_element);
    }

    if(!passwordValid){
        shake(password_element);
    }

    

    if(emailValid && passwordValid){
        let user = new User(email,password,first_name,last_name,phone_number);

        let user_string = convertToString(user);
        localStorage.setItem('user',user_string);

        console.log("User stored successfully");
        window.location.href = `../HTML/main.html`;
    }else{
        console.log("Invalid email or password");
    }
   

    


})


