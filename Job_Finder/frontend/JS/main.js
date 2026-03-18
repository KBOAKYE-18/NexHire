//select HTML elements
let body_container = document.querySelector(".body");
let info_container = document.querySelector('.info-container');
let upper_part = document.querySelector('.upper-part');
let home_element = document.getElementById('Home');
let log_out_element = document.getElementById('logout');
let main_element = document.querySelector('.main');

//Array of jobs
let jobs_arr;


//entry point
async function fetch_remote_Jobs() {
    try {
        let response = await fetch("https://remotive.com/api/remote-jobs");
        let data = await response.json();

        jobs_arr = data.jobs;
        
        for (let index = 0; index < jobs_arr.length; index++) {
           console.log(jobs_arr[index]);
            
        }

        load_cards(jobs_arr);
    } catch (error) {
        console.error(error.message);
    }
}


function displayProfile() {
    //Display profile
    let storedUser = JSON.parse(localStorage.getItem('user'));
    let user_name = storedUser.first_name + " " + storedUser.last_name;


    let initials = storedUser.first_name.charAt(0) + storedUser.last_name.charAt(0);
    document.getElementById('profile-initials').textContent = initials.toUpperCase();
    document.getElementById('profile-name').textContent = user_name;
    document.getElementById('profile-email').textContent = storedUser.email;
}

displayProfile();

/*Loads card is a function that renders the job fetched using the fetch API it takes data and renders
  avoiding rendundancy when it comes to the search functionality and update needed to apply in the 
  future making it reusable and simple;
*/


//Job cards
function load_cards(arr) {
        arr.forEach((job,index) => {
        let job_title = job.title;
        let salary = job.salary || "salary not specified";
        let location = job.candidate_required_location;
        let description = job.description;
        let company_name = job.company_name;
        let category = job.category;

        //Letter Boxes
        const colors = ['#6c63ff','#f5a623','#e74c3c','#2ecc71','#3498db','#e67e22','#9b59b6'];
        const color = colors[index % colors.length];
        const initial = company_name.charAt(0).toUpperCase();

        
        let cleanDescription = description.replace(/style="[^"]*"/g, "").replace(/<img[^>]*>/g, "");


        let card = document.createElement('div');
        card.classList.add('jobs');
        
        card.innerHTML = `
    <div class = "card-container">
        <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:8px; background:${color};
                    display:flex; align-items:center; justify-content:center;
                    font-weight:700; font-size:1rem; color:white; flex-shrink:0;">
                ${initial}
            </div>
            <h2 style="font-size:1.1rem;">${job_title}</h2>
        </div>
        <div class = "b_container">
            <div style="color:grey;" class = "tiny-boxes">${location}</div>
            <div style="color:grey;" class = "tiny-boxes">remote</div>
            <div style="color:grey;" class = "tiny-boxes">full-time</div>
        </div>
        <div style="color:rgb(69,195,69);  font-family:'Syne',sans-serif; font-size:1.2rem;">${salary}</div>
    </div>
  `;

        body_container.appendChild(card);

        card.addEventListener('click',()=>{
            info_container.innerHTML = ``;
            upper_part.innerHTML = ``;

            let title_head = document.createElement('h2');
            let info = document.createElement('div');
            let box = document.createElement('div');

            const work_type = "remote";
            box.classList.add('box');
            info.classList.add('info');

            title_head.innerHTML = `
                <h2 style = "font-size:1.7rem;">${job_title}</h2>
                        
            `;

            box.innerHTML = `
                <div class="stat-row">
                    <div class="stat">
                        <span class="stat-num">Company</span>
                        <span class="stat-label">${company_name}</span>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat">
                        <span class="stat-num">Work Type</span>
                        <span class="stat-label">${work_type}</span>
                     </div>
                    <div class="stat-divider"></div>
                        <div class="stat">
                            <span class="stat-num">Category</span>
                            <span class="stat-label">${category}</span>
                         </div>
                </div>
            `;

            info.innerHTML = `
                <h2 style = "margin-bottom:10px; font-size:1.3rem;">Job Description </h2>
                ${cleanDescription}
            `;

            upper_part.appendChild(title_head);
            upper_part.appendChild(box);
            info_container.appendChild(info);
        })
    });
}


function convertToPlainText(html){
    let temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
}


log_out_element.addEventListener('click',()=>{
    window.location.href = `../HTML/login.html`;
})

home_element.addEventListener('click',()=>{
     window.location.href = `../HTML/index.html`;
})

// Search functionality
let search_input = document.querySelector('.search');

search_input.addEventListener('input', () => {
    let query = search_input.value.toLowerCase();

    // Clear current cards
    body_container.innerHTML = "";

    // Filter jobs
    let filtered_jobs = jobs_arr.filter(job => {
        return (
            job.title.toLowerCase().includes(query) ||
            job.company_name.toLowerCase().includes(query) ||
            job.category.toLowerCase().includes(query)
        );
    });

    // Render filtered jobs
    load_cards(filtered_jobs);
    
});


fetch_remote_Jobs();
