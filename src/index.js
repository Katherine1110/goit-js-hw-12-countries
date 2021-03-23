import countriesListTpl from "./templates/countriesList.hbs";
import oneCountryCardTpl from "./templates/oneCountryCard.hbs";
import styles from "./styles.css";

const debounce = require("lodash.debounce");
import "@pnotify/core/dist/BrightTheme.css";
const { error } = require("@pnotify/core");
import API from "./fetchCountries.js";

const input = document.querySelector(".search");
const cardContainer = document.querySelector(".js-card-container");
// console.log(input);

input.addEventListener("input", debounce(searchCountry, 500));

function searchCountry(event) {
  const searchQuery = event.target.value;
  console.log(searchQuery);

  if (searchQuery.length > 0) {
    API.fetchCountries(searchQuery)
      .then(renderCountryCardList)
      .catch(onFetchError);
  }
}

function renderCountryCardList(country) {
  let markup;
  if (country.length > 10) {
    markup = "";
    error({
      text: "Too many matches found. Please enter a more specific query!",
    });
  } else if (country.status === 404) {
    markup = "";
    error({
      text: "No country has been found. Please enter a more specific query!",
    });
  } else if (country.length === 1) {
    markup = oneCountryCardTpl(country);
  } else {
    markup = countriesListTpl(country);
  }
  cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert(error);
}
