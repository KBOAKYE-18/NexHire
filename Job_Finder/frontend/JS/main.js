let body_container = document.querySelector(".body");
let info_container = document.querySelector('.info-container');
let upper_part = document.querySelector('.upper-part');

let jobs_arr;

async function fetch_remote_Jobs() {
    try {
        let response = await fetch("https://remotive.com/api/remote-jobs");
        let data = await response.json();

        jobs_arr = data.jobs;
        
        for (let index = 0; index < jobs_arr.length; index++) {
           console.log(jobs_arr[index]);
            
        }

        load_cards();
    } catch (error) {
        console.error(error.message);
    }
}


function load_cards() {
    jobs_arr.forEach(job => {
        let job_title = job.title;
        let salary = job.salary || "Salary not specified";
        let location = job.candidate_required_location;
        let description = job.description;
        let company_name = job.company_name;
        let category = job.category;

        
        let cleanDescription = description.replace(/style="[^"]*"/g, "").replace(/<img[^>]*>/g, "");


        let card = document.createElement('div');
        card.classList.add('jobs');
        
        card.innerHTML = `
            <h2>${job_title}</h2>
            <span style = "color:grey;">${location} <span class = "circle" ></span> remote  <span class = "circle" ></span>  full-time</span>
            <span style="color:rgb(69, 195, 69); font-family:'Syne',sans-serif; font-size: 1.3rem;" >${salary}</span>
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




fetch_remote_Jobs();
