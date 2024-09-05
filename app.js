import { getData, updateData } from "./data/data.js";

let data = getData();
let allData = data;
const main = document.querySelector("main");
const countriesContainer = document.querySelector(".countries-container");
const homeButton = document.querySelector("header h1");
const searchContainer = document.querySelector("#search-container");
var name;
var region;

window.onload = setup();

homeButton.addEventListener("click", () => {
  setup();
});

function render() {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    renderData(country);
  });
}
function setup() {
  main.innerHTML = "";
  main.appendChild(searchContainer);
  main.appendChild(countriesContainer);

  name = document.querySelector("#search");
  region = document.querySelector("#region");
  name.value = "";
  region.value = "all";
  data = allData;

  render();

  region.addEventListener("change", async (event) => {
    data = await updateData(event.target.value, name.value);
    countriesContainer.innerHTML = "";
    if (data.length === 0) {
      const noResult = document.createElement("div");
      noResult.classList.add("no-result");
      noResult.innerHTML = `
      <h2>No Results Found</h2>
      `;
      countriesContainer.appendChild(noResult);
    } else {
      render();
    }
  });

  name.addEventListener("input", async (event) => {
    data = await updateData(region.value, event.target.value);
    countriesContainer.innerHTML = "";
    if (data.length === 0) {
      const noResult = document.createElement("div");
      noResult.classList.add("no-result");
      noResult.innerHTML = `
      <h2>No Results Found</h2>
      `;
      countriesContainer.appendChild(noResult);
    } else {
      render();
    }
  });
}
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
  countriesContainer.appendChild(countryContainer);
  countryContainer.addEventListener("click", () => {
    updateSelectedCountry(country);
  });
}

// Country Selection
var selectedCountry = {
  flag: "",

  name: "",
  nativeName: "",
  population: "",
  region: "",
  subregion: "",
  capital: "",

  topLevelDomain: "",
  currency: "",
  languages: "",

  borders: [],
};

function updateSelectedCountry(country) {
  selectedCountry.flag = country.flag;
  selectedCountry.name = country.name;
  selectedCountry.nativeName = country.nativeName;
  selectedCountry.population = country.population;
  selectedCountry.region = country.region;
  selectedCountry.subregion = country.subregion;
  selectedCountry.capital = country.capital;
  selectedCountry.topLevelDomain = country.topLevelDomain;
  selectedCountry.currency = country.currencies[0].name;
  selectedCountry.languages = country.languages;
  selectedCountry.borders = country.borders;
  renderSelectedCountry(selectedCountry);
}
function renderSelectedCountry(selectedCountry) {
  const selectedCountryContainer = document.createElement("div");
  selectedCountryContainer.classList.add("selected-country-container");
  selectedCountryContainer.innerHTML = `
      <div class="back-button">
        <button id="back-button" style="display: block">Back</button>
      </div>
      
      <div class="selected-country">
        <div class="flag">
          <img src="${selectedCountry.flag}" alt="${selectedCountry.name}">
        </div>

        <div class="info">
          <div class="name">
            <p>${selectedCountry.name}</p>
          </div>
          
          <div class="details">

            <div class="left">
              <p><strong>Native Name:</strong> ${selectedCountry.nativeName}</p>
              <p><strong>Population:</strong> ${selectedCountry.population}</p>
              <p><strong>Region:</strong> ${selectedCountry.region}</p>
              <p><strong>Sub Region:</strong> ${selectedCountry.subregion}</p>
              <p><strong>Capital:</strong> ${selectedCountry.capital}</p>
            </div>

            <div class="right">
              <p><strong>Top Level Domain:</strong> ${
                selectedCountry.topLevelDomain
              }</p>
              <p><strong>Currencies:</strong> ${selectedCountry.currency}</p>
              <p><strong>Languages:</strong> ${addLanguages(
                selectedCountry.languages
              )}</p>
            </div>

          </div>

          <div class="borders">
            <div>
              <p><strong>Border Countries:</strong></p>
            </div>
            <div class="border-countries-list">
              ${addBorders(selectedCountry)}
            </div>
          </div>

        </div>
      </div>
    `;
  main.innerHTML = "";
  main.appendChild(selectedCountryContainer);
  addBorderEvents(selectedCountry);
  addBackEvent();
}
function addLanguages(languages) {
  var languageList = [];
  for (let i = 0; i < languages.length; i++) {
    languageList.push(languages[i].name);
  }
  return languageList.join(", ");
}
function addBorders(selectedCountry) {
  if (selectedCountry.borders)
    return selectedCountry.borders
      .map(
        (border) =>
          `<button id="${border}-button">${
            allData.find((country) => country.alpha3Code === border).name
          }</button>`
      )
      .join("");
  else return "No Border Countries";
}
function addBorderEvents(selectedCountry) {
  if (selectedCountry.borders)
    selectedCountry.borders.forEach((border) => {
      const borderButton = document.querySelector(`#${border}-button`);
      borderButton.addEventListener("click", async () => {
        const country = allData.find(
          (country) => country.alpha3Code === border
        );
        updateSelectedCountry(country);
      });
    });
}
function addBackEvent() {
  const backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", () => {
    setup();
  });
}

//Dark Mode
var mode = document.querySelector("#dark-mode-toggle");
mode.addEventListener("click", () => {
  var r = document.querySelector(":root");
  if (getComputedStyle(r).getPropertyValue("--background") === "#212e37") {
    r.style.setProperty("--background", "#fafafa");
    r.style.setProperty("--text-color", "#000");
    r.style.setProperty("--element-background", "#fff");
    r.style.setProperty("--input-background", "#fff");
    r.style.setProperty("--button-color", "#fff");
    r.style.setProperty("--button-text-color", "#212e37");
    r.style.setProperty("--card-background", "#fff");
  } else {
    r.style.setProperty("--background", "#212e37");
    r.style.setProperty("--text-color", "#fff");
    r.style.setProperty("--element-background", "#212e37");
    r.style.setProperty("--input-background", "#212e37");
    r.style.setProperty("--button-color", "#212e37");
    r.style.setProperty("--button-text-color", "#fff");
    r.style.setProperty("--card-background", "#2b3743");
  }
});
