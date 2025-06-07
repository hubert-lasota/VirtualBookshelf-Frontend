import { Box, Button, Menu, MenuItem } from "@mui/material";

import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useUserContext } from "../../../features/user/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

function getMenuItems(
  isPlLanguage: boolean,
  skipPathname: string,
): { label: string; pathname: string }[] {
  const items = [
    {
      label: isPlLanguage ? "Strona Główna" : "HomePage",
      pathname: "/home",
    },
    {
      label: isPlLanguage ? "Moje regały" : "My bookshelves",
      pathname: "/my-bookshelves",
    },
  ];
  return items.filter(({ pathname }) => pathname !== skipPathname);
}

export default function AppPagesDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box>
      <Button
        endIcon={<ArrowDropDownIcon />}
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={(theme) => ({ color: theme.palette.text.primary, p: 1 })}
      >
        {isPlLanguage ? "Strony" : "Pages"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        sx={{ width: "100%" }}
      >
        {getMenuItems(isPlLanguage, location.pathname).map(
          ({ label, pathname }) => (
            <MenuItem
              key={`${pathname}${label}`}
              sx={{ paddingInline: "2rem" }}
              onClick={() => navigate(pathname)}
            >
              {label}
            </MenuItem>
          ),
        )}
      </Menu>
    </Box>
  );
}
