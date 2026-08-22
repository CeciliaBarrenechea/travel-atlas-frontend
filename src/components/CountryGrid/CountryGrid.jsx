import CountryCard from "../CountryCard/CountryCard";
import "./CountryGrid.css";

function CountryGrid({
  countries,
  totalCountries,
  hasMoreCountries,
  onLoadMore,
  title,
}) {
  if (countries.length === 0) {
    return null;
  }

  return (
    <section className="country-grid" aria-label="Country search results">
      <div className="country-grid__header">
        <h2 className="country-grid__title">{title}</h2>

        <p className="country-grid__count">
          {totalCountries} {totalCountries === 1 ? "country" : "countries"}{" "}
          found
        </p>
      </div>

      <div className="country-grid__cards">
        {countries.map((country) => (
          <CountryCard
            key={country.id}
            name={country.name}
            region={country.region}
            capital={country.capital}
            population={country.population}
            image={country.image}
            flag={country.flag}
          />
        ))}
      </div>

      {hasMoreCountries && (
        <button
          className="country-grid__load-more"
          type="button"
          onClick={onLoadMore}
        >
          Load more
        </button>
      )}
    </section>
  );
}

export default CountryGrid;
