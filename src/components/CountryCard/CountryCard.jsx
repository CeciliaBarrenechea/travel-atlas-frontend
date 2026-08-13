import "./CountryCard.css";

function CountryCard({
  name,
  region,
  capital,
  population,
  image,
  flag,
}) {
  const handleImageError = (event) => {
    if (event.currentTarget.src !== flag) {
      event.currentTarget.src = flag;
    }
  };

  return (
    <article className="country-card">
      <img
        className="country-card__image"
        src={image}
        alt={`Scenic view representing ${name}`}
        loading="lazy"
        onError={handleImageError}
      />

      <div className="country-card__content">
        <div className="country-card__heading">
          <div>
            <h3 className="country-card__name">
              {name}
            </h3>

            <p className="country-card__region">
              {region}
            </p>
          </div>

          {flag && (
            <img
              className="country-card__flag"
              src={flag}
              alt={`${name} flag`}
              loading="lazy"
            />
          )}
        </div>

        <p className="country-card__capital">
          <span className="country-card__label">
            Capital:
          </span>{" "}
          {capital}
        </p>

        <p className="country-card__population">
          {population} inhabitants
        </p>
      </div>
    </article>
  );
}

export default CountryCard;