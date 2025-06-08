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

  // return (
  //   <GlobalHeaderContainer>
  //     <AppLogo />
  //     <div className={css["nav-right-side"]}>
  //       {hrefs.map(({ href, label }) => (
  //         <a key={href} href={href} className={css["nav-right-side-href"]}>
  //           {label}
  //         </a>
  //       ))}
  //       <Button
  //         className={css["nav-login-btn"]}
  //         onClick={() => navigate("/login")}
  //       >
  //         Zaloguj się
  //       </Button>
  //     </div>
  //   </GlobalHeaderContainer>
  // );
}
