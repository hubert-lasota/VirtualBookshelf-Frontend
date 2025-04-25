import { FaBookmark, FaBookOpen, FaLaptop, FaSearch } from "react-icons/fa";
import css from "./landing.module.css";

const features = [
  {
    name: "Wirtualne regały",
    description:
      "Twórz własne regały i organizuj książki według gatunków, autorów lub własnych kategorii.",
    icon: <FaBookOpen className="feature-icon" />,
  },
  {
    name: "Zaawansowane wyszukiwanie",
    description:
      "Szybko znajdź książki dzięki inteligentnej wyszukiwarce z filtrowaniem i sortowaniem.",
    icon: <FaSearch className="feature-icon" />,
  },
  {
    name: "Śledzenie postępów czytania",
    description:
      "Zaznaczaj przeczytane strony i śledź swoje postępy w każdej książce.",
    icon: <FaBookmark className="feature-icon" />,
  },
  {
    name: "Dostęp z każdego urządzenia",
    description:
      "Twoja biblioteka jest dostępna na komputerze, tablecie i telefonie, zawsze zsynchronizowana.",
    icon: <FaLaptop className="feature-icon" />,
  },
];

export default function Features() {
  return (
    <div id="features" className="features-section">
      <div className={css["features-container"]}>
        <div className="features-header">
          <h2 className="features-subtitle">Funkcje</h2>
          <p className="features-title">
            Lepszy sposób na zarządzanie książkami
          </p>
          <p className="features-description">
            BookShelf to więcej niż katalog - to kompletne narzędzie dla
            miłośników literatury.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.name} className="feature-item">
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <p className="feature-name">{feature.name}</p>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
