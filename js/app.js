const form = document.querySelector("#formulario")
const cityField = document.querySelector("#ciudad")
const countryField = document.querySelector("#pais")
const submitBtn = document.querySelector("#submit-btn")
const result = document.querySelector("#resultado")

const validate = (e) =>{
    if (e.target.value !== ""){
        enable()
    }else {
        console.log("The field cant be empty")
    }
}
const getApiData = (city, country) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}\`
                        &appid=3b2fa0825392ef439f6265ce4c7c5987`
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error(error))
}
form.addEventListener("submit", (e) => {
    e.preventDefault()
    getApiData(cityField.value, countryField.value)
})
const enable = (qualifiedName, value) =>{
    if (countryField.value !== "" && cityField.value !== ""){
        submitBtn.removeAttribute("disabled")
        submitBtn.classList.remove('opacity-50')
    }else {
        submitBtn.setAttribute("disabled", value)
        submitBtn.classList.add('opacity-50')
    }
}
cityField.addEventListener("blur", validate)
countryField.addEventListener("input", validate)