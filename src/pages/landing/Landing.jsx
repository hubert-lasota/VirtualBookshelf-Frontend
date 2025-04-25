import css from "./landing.module.css";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";

export default function Landing() {
  return (
    <div className={css["page"]}>
      <Navbar />
      <Hero />
    </div>
  );
}
