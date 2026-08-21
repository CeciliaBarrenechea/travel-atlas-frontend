import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import ceciliaPhoto from "../assets/images/about_photo.jpeg";
import "./Home.css";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about") {
      const aboutSection = document.getElementById("about");
      aboutSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main>
      <Hero />

      <section className="about" id="about">
        <div className="about__container">
          <span className="about__eyebrow">About Travel Atlas</span>

          <h2 className="about__title">
            Built by someone who loves the road as much as the map
          </h2>

          <div className="about__content">
            <div className="about__photo-wrapper">
              <img
                className="about__photo"
                src={ceciliaPhoto}
                alt="Cecilia Barrenechea at the Salar de Uyuni, Bolivia"
              />
            </div>

            <div className="about__text-block">
              <p className="about__text">
                Hi, I'm <strong>Cecilia Barrenechea</strong>, the person behind
                Travel Atlas. This project started as a way to sharpen my skills
                as a developer, but it quickly became something more personal: a
                place where my love for traveling and discovering new cultures
                could live inside the thing I was building.
              </p>

              <p className="about__text">
                Every trip I take leaves me with the same question:{" "}
                <em>what else don't I know about this country?</em> Travel Atlas
                exists to answer that question for anyone curious enough to ask
                it — whether you're planning your next trip, researching for
                school, or just falling down a rabbit hole of geography at 2
                a.m.
              </p>

              <blockquote className="about__mission">
                <p>
                  My mission is simple: make reliable information about every
                  country in the world easy to find, easy to read, and genuinely
                  enjoyable to explore.
                </p>
              </blockquote>

              <p className="about__text">
                I built this project by hand, one feature at a time, and I keep
                improving it the same way I plan my trips: carefully, curiously,
                and with a lot of attention to detail. If you run into something
                that doesn't work the way it should, I want to know — this is a
                project made for real travelers, by a real traveler.
              </p>

              <p className="about__signature">
                — Cecilia Barrenechea, creator of Travel Atlas
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
