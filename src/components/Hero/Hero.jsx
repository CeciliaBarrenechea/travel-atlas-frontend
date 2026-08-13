import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Explore every country with ease
          </h1>

          <p className="hero__description">
            Discover information about every nation, from capitals and
            languages to currencies, population and geography.
          </p>

          <Link
            to="/explore"
            className="hero__button"
          >
            Explore Countries
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;