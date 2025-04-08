let target = 'New Delhi';

const tempField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const dateField = document.querySelector(".daytime");
const weatherField = document.querySelector(".condition");
const searchField = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

searchButton.addEventListener('click', searchForLocation);

async function getWeather(targetLocation){
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${targetLocation}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '78e7883137msh3249276ab10c865p14a37ajsn57469620b289',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    let locationName = result.location.name;
    let time = result.location.localtime;
    let tempc = result.current.temp_c;
    let conditon = result.current.condition.text;

    updateDetails(locationName, time, tempc, conditon);
}

function updateDetails(locationName, time, tempc, condition){
    
    let [dateStr, timeStr] = time.split(' '); // "2025-04-08", "18:13"
    let date = new Date(`${dateStr}T${timeStr}`);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 0 becomes 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedTime = `${hours}:${minutes}`;
    
    // Update time and AM/PM separately
    document.querySelector(".time p").innerHTML = `${formattedTime}<span class="am-pm">${ampm}</span>`;

    let dayName = getDayName(date.getDay());
    let day = date.getDate();
    let month = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ][date.getMonth()];
    let year = date.getFullYear();
    
    document.querySelector(".day").innerText = `${dayName} ${day} ${month} ${year}`;

    tempField.innerText = tempc;
    locationField.innerText = locationName;
    weatherField.innerText = condition;
}


function searchForLocation(e){
    e.preventDefault();
    target = searchField.value;
    getWeather(target);
}

getWeather(target);

function getDayName(number){
    switch(number){
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}