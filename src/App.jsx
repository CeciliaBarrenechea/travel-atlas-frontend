import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { searchCountries, getPopularCountries } from "./utils/CountriesApi";

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    getPopularCountries()
      .then((popularCountries) => {
        setCountries(popularCountries);
      })
      .catch(() => {
        setError("Sorry, something went wrong while loading countries.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (countryName) => {
    setIsLoading(true);
    setError("");
    setCountries([]);
    setHasSearched(true);
    setLastQuery(countryName.trim());

    searchCountries(countryName)
      .then((countryResults) => {
        setCountries(countryResults);
      })
      .catch(() => {
        setCountries([]);
        setError(
          "Sorry, something went wrong while requesting the data. Please try again later.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/explore"
          element={
            <Explore
              countries={countries}
              isLoading={isLoading}
              error={error}
              hasSearched={hasSearched}
              lastQuery={lastQuery}
              onSearch={handleSearch}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;