import { getCountryImage } from "./countryImages";

// API pública y gratuita, sin necesidad de API key ni límite de requests.
// Docs: https://countries.dev/docs
const BASE_URL = "https://countries.dev";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  // Cuando no encuentra el país, countries.dev devuelve 404 con texto plano
  // ("Country not found"). Lo tratamos como "sin resultados" más adelante.
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
  // En countries.dev, "languages" es un array de objetos: [{ name: "Spanish", ... }]
  if (!Array.isArray(languages) || languages.length === 0) {
    return "No language information";
  }

  return languages.map((language) => language.name).join(", ");
}

function transformCountry(country) {
  // countries.dev no distingue nombre "común" de "oficial" como restcountries;
  // devuelve un único campo "name".
  const name = country.name ?? "Unknown country";

  return {
    id: country.alpha3Code ?? country.alpha2Code ?? name,

    name,

    officialName: name,

    region: country.region ?? "Unknown region",

    // "capital" ya viene como string simple, no como array de objetos.
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

  // GET /name/{name} — el nombre va en la ruta, no como query param.
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
  const popularCountries = [
    "Bolivia",
    "Canada",
    "Japan",
    "France",
    "Brazil",
    "Italy",
  ];

  return Promise.all(
    popularCountries.map((countryName) =>
      searchCountries(countryName).then((countries) => countries[0])
    )
  ).then((countries) => countries.filter(Boolean));
}
