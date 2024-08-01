const  apikey = "b23e445e85ce8140f2a155167022e942"
const weatherdataEle = document.querySelector(".weather-data")
const citynameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imageIcon = document.querySelector(".icon")


formEle.addEventListener("submit",(e)=>
{
    e.preventDefault()
    // console.log(citynameEle.value);
    const cityvalue = citynameEle.value
    getweatherdata(cityvalue) 
})

 async function getweatherdata(cityvalue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=matric`)
        if(!response.ok){
            throw new Error("Network response is not ok! Wait")
        }
        const data  = await response.json()
        // console.log(data);
        const temprature = (data.main.temp)
        const temprature1 = Math.floor(temprature-273.15)
        const description = data.weather[0].description
        const icon = data.weather[0].icon


        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like-273.17)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherdataEle.querySelector(".temp").textContent = `${temprature1}°C`
        weatherdataEle.querySelector(".desc").textContent = `${description}`
        imageIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather image">`

        weatherdataEle.querySelector(".details").innerHTML = details.map((detail)=>{
            return `<div>${detail}</div>`
        }).join("")
    




    }catch(err){
        weatherdataEle.querySelector(".temp").textContent =""
        imageIcon.innerHTML =""
        weatherdataEle.querySelector(".desc").textContent = "An Error occurred"
    }
}
