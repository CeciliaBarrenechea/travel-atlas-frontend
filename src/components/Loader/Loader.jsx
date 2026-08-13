import "./Loader.css";

function Loader() {
  return (
    <div
      className="loader"
      role="status"
      aria-live="polite"
    >
      <span className="loader__spinner" aria-hidden="true" />

      <p className="loader__text">
        Searching for countries...
      </p>
    </div>
  );
}

export default Loader;