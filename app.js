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
            <p><strong>Population:</strong> ${country.population}5</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
    </div>
    `;
    container.appendChild(countryContainer);
}
document.querySelector("#region").addEventListener("change", async (event) => {
    data = await updateData(event.target.value);
    container.innerHTML = '';
    data.forEach(country => {
        renderData(country);
    })
})