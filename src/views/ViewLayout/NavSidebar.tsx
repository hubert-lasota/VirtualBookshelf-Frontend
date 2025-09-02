import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AppLogo from "../../common/components/AppLogo/AppLogo";
import { useUserContext } from "../../common/auth/UserContext";
import NavItem from "./NavItem";
import {
  BookOpenText,
  ChartNoAxesCombined,
  House,
  Search,
  SquareLibrary,
  Target,
} from "lucide-react";
import UserNavItem from "./UserNavItem";

export default function NavSidebar() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const navItems = [
    {
      label: isPlLanguage ? "Strona główna" : "Home",
      icon: House,
      path: "/home",
    },
    {
      label: isPlLanguage ? "Moje regały" : "My bookshelves",
      icon: SquareLibrary,
      path: "/bookshelves",
    },
    {
      label: isPlLanguage ? "Sesje czytelnicze" : "Reading sessions",
      icon: BookOpenText,
      path: "/reading-sessions",
    },
    {
      label: isPlLanguage ? "Wyzwania" : "Challenges",
      icon: Target,
      path: "/challenges",
    },
    {
      label: isPlLanguage ? "Statystyki" : "Statistics",
      icon: ChartNoAxesCombined,
      path: "/statistics",
    },
    {
      label: isPlLanguage ? "Szukaj" : "Search",
      icon: Search,
      path: "/search",
    },
  ];

  return (
    <Stack
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        maxHeight: "100dvh",
        borderRight: `1px solid ${theme.palette.divider}`,
        justifyContent: "space-between",
        backgroundImage:
          "linear-gradient(180deg, hsl(35 40% 95%), hsl(35 20% 96%))",
      })}
    >
      <Stack>
        <Box
          sx={(theme) => ({
            padding: theme.spacing(3),
            borderBottom: `1px solid ${theme.palette.divider}`,
          })}
        >
          <AppLogo />
        </Box>
        <Stack
          spacing={0.5}
          sx={(theme) => ({
            paddingInline: theme.spacing(1.5),
          })}
        >
          {navItems.map(({ path, ...props }) => (
            <NavItem
              {...props}
              onClick={() => navigate(path)}
              isSelected={path === pathname}
            />
          ))}
        </Stack>
      </Stack>
      <Box
        sx={(theme) => ({
          padding: theme.spacing(3),
          borderTop: `1px solid ${theme.palette.divider}`,
        })}
      >
        <UserNavItem />
      </Box>
    </Stack>
  );
}
