let target = 'Patiala';

async function getWeather(targetLocation){
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${targetLocation}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '78e7883137msh3249276ab10c865p14a37ajsn57469620b289',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error(error);
    }
}
getWeather(target);