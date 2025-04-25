import css from "./landing.module.css";
import Button from "../../common/components/button/Button.jsx";
import GlobalHeader from "../../common/components/global_header/GlobalHeader.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const hrefs = [
    {
      href: "#features",
      label: "Features",
    },
    {
      href: "#testimonials",
      label: "Testimonials",
    },
  ];

  const NavRightSide = () => (
    <div className={css["nav-right-side"]}>
      {hrefs.map(({ href, label }) => (
        <a key={href} href={href} className={css["nav-right-side-href"]}>
          {label}
        </a>
      ))}
      <Button
        className={css["nav-login-btn"]}
        onClick={() => navigate("/login")}
      >
        Zaloguj się
      </Button>
    </div>
  );
  return <GlobalHeader rightSideComponent={NavRightSide} />;
}
