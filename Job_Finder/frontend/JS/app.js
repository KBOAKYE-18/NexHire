//send email and password to backend
let email_element = document.getElementById('email');
let password_element = document.getElementById('password');
let btn_element = document.getElementById('btn');



async function sendData() {
    
    try {
        const email = email_element.value;
        const password = password_element.value;

        console.log("email:",email);
        console.log("password:",password);

        const response = await fetch("",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password}),
        });

        
    } catch (error) {
        console.log("Login failed:",error.message);
    }


   
}


btn_element.addEventListener('click',sendData);


