import { getData, updateData } from "./data/data.js";

const container = document.querySelector(".countries-container");
let data = getData();
console.log(data);
data.forEach(country => {
    renderData(country);
});

function renderData(country) {
    const countryContainer = document.createElement("div");
    countryContainer.classList.add("country-container");
    countryContainer.innerHTML = `
        <img src="${country.flag}" alt="${country.name}">
        <div class="card-info">
            <h2>${country.name}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
    </div>
    `;
    container.appendChild(countryContainer);
}

var region = document.querySelector("#region");
var name = document.querySelector("#search");

region.addEventListener("change", async (event) => {
    data = await updateData(event.target.value, name.value);
    container.innerHTML = '';
    data.forEach(country => {
        renderData(country);
    })
})

name.addEventListener("input", async (event) => {
    data = await updateData(region.value, event.target.value);
    container.innerHTML = '';
    if (data.length === 0) {
        const noResult = document.createElement("div");
        noResult.classList.add("no-result");
        noResult.innerHTML = `
        <h2>No Results Found</h2>
        `;
        container.appendChild(noResult);
    }
    else {   
        data.forEach(country => {
            renderData(country);
        })
    }
})

//Dark Mode
var mode = document.querySelector("#dark-mode-toggle");
mode.addEventListener("click", () => {
    var r = document.querySelector(':root');
    if (getComputedStyle(r).getPropertyValue('--background') === '#212e37') {
        r.style.setProperty('--background', '#fff');
        r.style.setProperty('--text-color', '#000');
        r.style.setProperty('--element-background', '#fff');
        r.style.setProperty('--input-background', '#fff');
        r.style.setProperty('--button-color', '#fff');
        r.style.setProperty('--button-text-color', '#212e37');        
        r.style.setProperty('--card-background', '#fff');        
    }
    else {
        r.style.setProperty('--background', '#212e37');
        r.style.setProperty('--text-color', '#fff');
        r.style.setProperty('--element-background', '#212e37');
        r.style.setProperty('--input-background', '#212e37');
        r.style.setProperty('--button-color', '#212e37');
        r.style.setProperty('--button-text-color', '#fff');
        r.style.setProperty('--card-background', '#2b3743');        
    }
})