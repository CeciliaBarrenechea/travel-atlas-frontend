import { useEffect, useState, useRef } from "react";
import SearchForm from "../components/SearchForm/SearchForm";
import CountryGrid from "../components/CountryGrid/CountryGrid";
import Loader from "../components/Loader/Loader";
import { COUNTRIES_PER_PAGE } from "../utils/config";
import "./Explore.css";

function Explore({
  countries,
  isLoading,
  error,
  hasSearched,
  lastQuery,
  onSearch,
}) {
  const [isMessageDismissed, setIsMessageDismissed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(COUNTRIES_PER_PAGE);
  const resultsRef = useRef(null);

  const handleSearch = (countryName) => {
    setIsMessageDismissed(false);
    setVisibleCount(COUNTRIES_PER_PAGE);
    onSearch(countryName);

    // Lleva la vista hacia los resultados apenas se dispara la búsqueda,
    // para que no parezca que la app no encontró nada mientras carga.
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLoadMore = () => {
    setVisibleCount((currentCount) => currentCount + COUNTRIES_PER_PAGE);
  };

  const handleCloseMessage = () => {
    setIsMessageDismissed(true);
  };

  const visibleCountries = countries.slice(0, visibleCount);

  const hasMoreCountries = visibleCount < countries.length;

  const shouldShowNoResults =
    hasSearched && !isLoading && !error && countries.length === 0;

  const shouldShowModal =
    !isMessageDismissed && (Boolean(error) || shouldShowNoResults);

  useEffect(() => {
    if (!shouldShowModal) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseMessage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldShowModal]);

  return (
    <main className="explore">
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      <div ref={resultsRef} className="explore__results-anchor">
        {isLoading && <Loader />}

        {shouldShowModal && (
          <div className="explore__overlay" onClick={handleCloseMessage}>
            <div
              className={`explore__message ${
                error
                  ? "explore__message_type_error"
                  : "explore__message_type_empty"
              }`}
              role={error ? "alertdialog" : "dialog"}
              aria-live={error ? "assertive" : "polite"}
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="explore__message-close"
                onClick={handleCloseMessage}
                aria-label="Close"
              >
                ×
              </button>

              <span className="explore__message-icon" aria-hidden="true">
                {error ? "⚠️" : "🌍"}
              </span>

              {error ? (
                <>
                  <h2 className="explore__message-title">
                    Something went wrong
                  </h2>

                  <p className="explore__error">{error}</p>
                </>
              ) : (
                <>
                  <h2 className="explore__message-title">No results found</h2>

                  <p className="explore__no-results">
                    We could not find any countries matching{" "}
                    <strong>&ldquo;{lastQuery}&rdquo;</strong>. Check the
                    spelling and try again.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <CountryGrid
            countries={visibleCountries}
            totalCountries={countries.length}
            hasMoreCountries={hasMoreCountries}
            onLoadMore={handleLoadMore}
            title={hasSearched ? "Search results" : "Popular countries"}
          />
        )}
      </div>
    </main>
  );
}

export default Explore;