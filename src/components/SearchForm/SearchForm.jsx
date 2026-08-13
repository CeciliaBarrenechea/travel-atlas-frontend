import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedSearchValue = searchValue.trim();

    if (!normalizedSearchValue || isLoading) {
      return;
    }

    onSearch(normalizedSearchValue);
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <span className="search-form__eyebrow">Explore the world</span>

        <h1 className="search-form__title">
          Find information about any country
        </h1>

        <p className="search-form__description">
          Search by country name to discover its capital, region, population,
          languages and other useful information.
        </p>

        <form
          className="search-form__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="search-form__card">
            <label
              className="search-form__label"
              htmlFor="country-search"
            >
              Country name
            </label>

            <div className="search-form__field">
              <svg
                className="search-form__field-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                className="search-form__input"
                id="country-search"
                name="country"
                type="search"
                value={searchValue}
                onChange={handleChange}
                placeholder="For example: Bolivia"
                autoComplete="off"
                required
                disabled={isLoading}
              />

              <button
                className="search-form__button"
                type="submit"
                disabled={!searchValue.trim() || isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;