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
  //       {hrefs.map(({ href, Label }) => (
  //         <a key={href} href={href} className={css["nav-right-side-href"]}>
  //           {Label}
  //         </a>
  //       ))}
  //       <Button
  //         className={css["nav-Login-btn"]}
  //         onClick={() => navigate("/Login")}
  //       >
  //         Zaloguj się
  //       </Button>
  //     </div>
  //   </GlobalHeaderContainer>
  // );
}
