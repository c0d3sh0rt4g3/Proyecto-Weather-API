const token = "3b2fa0825392ef439f6265ce4c7c5987"

const form = document.querySelector("#formulario")
const cityField = document.querySelector("#ciudad")
const countryField = document.querySelector("#pais")
const submitBtn = document.querySelector("#submit-btn")
const result = document.querySelector("#resultado")

const validate = (e) =>{
    if (e.target.value !== ""){
        cleanseAlert(e.target.parentElement)
        enableSubmitBtn()
    }else {
        showError("The field cant be empty", e.target.parentElement)
    }
}

const getApiData = (city, country) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}\`
                        &appid=${token}`
    fetch(url)
        .then(response => response.json())
        .then(data => showWeatherOnHtml(data))
        .catch((error) => console.error(error))
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getApiData(cityField.value, countryField.value)
})

const cleanseAlert = (reference) =>{
    const alert = reference.querySelector(".bg-red-600")
    if(alert){
        alert.remove()
    }
}

const showError = (errorMsg, reference) =>{
    cleanseAlert(reference)
    const error = document.createElement("P")
    error.textContent = errorMsg
    error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
    reference.appendChild(error)
}

const enableSubmitBtn = (qualifiedName, value) =>{
    if (countryField.value !== "" && cityField.value !== ""){
        submitBtn.removeAttribute("disabled")
        submitBtn.classList.remove('opacity-50')
    }else {
        submitBtn.setAttribute("disabled", value)
        submitBtn.classList.add('opacity-50')
    }
}

const showWeatherOnHtml = (weatherData) =>{
    console.log(weatherData)
    const momentTemp = Math.round(kelvinToCelsiusConverter(weatherData.main.temp))
    const maxTemp = Math.round(kelvinToCelsiusConverter(weatherData.main.temp_max))
    const minTemp = Math.round(kelvinToCelsiusConverter(weatherData.main.temp_min))
    const cityName = weatherData.name
    result.innerHTML = `<h2 class="text-3xl mt-5 text-white font-bold uppercase text-center">${cityName}</h2>
                        <p class="text-2xl mt-5 text-white font-bold">Temperatura: ${momentTemp}ºC</p>
                        <p class="text-1xl mt-5 text-white font-bold">Maxima: ${maxTemp}ºC</p>
                        <p class="text-1xl mt-5 text-white font-bold">Minima: ${minTemp}ºC</p>`
}

const kelvinToCelsiusConverter = (kelvinTemperature) => {
    return kelvinTemperature - 273.15
}

cityField.addEventListener("blur", validate)
countryField.addEventListener("input", validate)