/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//API Key
const apiKey = 'ef88d6aa39d1e281a6450f3cb0162955';
//Listen to button click
document.querySelector('#generate').addEventListener('click',async ()=>{
    console.log('button clicked');
    const feelings = document.querySelector('#feelings').value;
    const zip = document.querySelector('#zip').value;
    if(zip==false){
        alert("Please Enter your Zipcode!!");
    }
    else{

        //get api data from openweathermap
        try{

            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`)
            const apiData= await res.json();
            console.log(apiData);
            const apiTemp = apiData.main.temp;
            const apiCountry = apiData.name; 
            console.log(apiCountry);
            //save the data to the server with POST 
            const postedData =  await fetch('/postWeather',{
            method: 'POST',
            credentials: "same-origin",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                date:newDate,
                temp:apiTemp,
                country:apiCountry,
                content:feelings
            })
            });
            const logpostedData = await postedData.json();
            console.log("POST >");
            console.log(logpostedData);
            //GET the data from the server 
            const getData = await fetch('/getWeather',{
                credentials: "same-origin",
            });
            const logGetData = await getData.json();
            console.log("GET <");
            console.log(logGetData);
            //update the UI
            updateUI(1);
        }catch(error){
            updateUI(0);
          }
    }
});


//update the UI of the website
const updateUI = async (flag) => {
    if(flag===1){
        const getWeatherData = await fetch('/getWeather');
        const weatherData = await getWeatherData.json();
        document.querySelector('#date').textContent =`Today is: ${weatherData.theDate}`;
        document.querySelector('#temp').textContent =`Temperature is: ${weatherData.temp} at: ${weatherData.country}`;
        document.querySelector('#content').textContent =`I'm Feeling: ${weatherData.content}`;
    }
    else{
        document.querySelector('#date').textContent =``;
        document.querySelector('#temp').textContent =``;
        document.querySelector('#content').textContent =`Sorry but you entered an invalid Zipcode\n\nHave another try!`;
    }
    
    
}