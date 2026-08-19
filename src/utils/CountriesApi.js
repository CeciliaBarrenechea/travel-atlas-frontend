import { getCountryImage } from "./countryImages";
import { BASE_URL, POPULAR_COUNTRIES } from "./config";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  if (res.status === 404) {
    return Promise.resolve([]);
  }

  return res
    .text()
    .catch(() => null)
    .then((errorText) => {
      throw new Error(errorText || `Request failed with status ${res.status}`);
    });
}

function formatPopulation(population) {
  if (typeof population !== "number") {
    return "No population information";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(population);
}

function formatLanguages(languages) {
  if (!Array.isArray(languages) || languages.length === 0) {
    return "No language information";
  }
  return languages.map((language) => language.name).join(", ");
}

function transformCountry(country) {
  const name = country.name ?? "Unknown country";
  return {
    id: country.alpha3Code ?? country.alpha2Code ?? name,
    name,
    officialName: name,
    region: country.region ?? "Unknown region",
    capital: country.capital || "No capital information",
    population: formatPopulation(country.population),
    flag: country.flags?.png ?? country.flags?.svg ?? "",
    image: getCountryImage(name, country.region),
    languages: formatLanguages(country.languages),
  };
}

export function searchCountries(countryName) {
  const trimmedCountryName = countryName.trim();

  if (!trimmedCountryName) {
    return Promise.resolve([]);
  }

  const url = `${BASE_URL}/name/${encodeURIComponent(trimmedCountryName)}`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then(checkResponse)
    .then((countries) => {
      if (!Array.isArray(countries)) {
        throw new Error("The API returned an unexpected response.");
      }

      return countries.map(transformCountry);
    });
}

export function getPopularCountries() {
  return Promise.all(
    POPULAR_COUNTRIES.map((countryName) =>
      searchCountries(countryName).then((countries) => countries[0])
    )
  ).then((countries) => countries.filter(Boolean));
}
