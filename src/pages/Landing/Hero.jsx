import css from "./landing.module.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className={css["hero"]}>
      <div className={css["hero-content"]}>
        <h1 className={css["hero-title"]}>
          <p>Twoja biblioteka </p>
          <p className={css["hero-title-accent"]}>zawsze pod ręką</p>
        </h1>
        <p className={css["hero-description"]}>
          Przechowuj swoje książki na wirtualnych regałach. Organizuj, kataloguj
          i odkrywaj nowe tytuły. Twoja osobista biblioteka dostępna zawsze na
          każdym urządzeniu.
        </p>
        <div className={css["hero-buttons"]}>
          {/*<Button onClick={() => navigate("/Login")}>*/}
          {/*  Rozpocznij za darmo*/}
          {/*</Button>*/}
          {/*<Button component="a" color="primary-light">*/}
          {/*  Dowiedz się wiecej*/}
          {/*</Button>*/}
        </div>
      </div>
    </div>
  );
}
