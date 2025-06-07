import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import ChangeLanguageDialog from "./ChangeLanguageDialog";

export default function SettingsButton() {
  const {
    user: { profile },
    preferences: { isPlLanguage },
  } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const [isChangeLanguageDialogOpen, setIsChangeLanguageDialogOpen] =
    useState(false);

  const menuItems = [
    {
      text: isPlLanguage ? "Profil" : "Profile",
      icon: <PersonIcon />,
      onClick: () => navigate("/me"),
    },
    {
      text: isPlLanguage ? "Ustawienia" : "Settings",
      icon: <SettingsIcon />,
      onClick: () => navigate("/me/settings"),
    },
    {
      text: isPlLanguage ? "Zmień język" : "Change language",
      icon: <LanguageIcon />,
      onClick: () => {
        setAnchorEl(null);
        setIsChangeLanguageDialogOpen(true);
      },
    },
    {
      text: isPlLanguage ? "Wyloguj się" : "Logout",
      icon: <LogoutIcon />,
      onClick: () => navigate("/login"),
    },
  ];

  return (
    <>
      <Avatar
        alt={`${profile.firstName} ${profile.lastName}`}
        src={profile.pictureUrl}
        sx={{ cursor: "pointer" }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {menuItems.map(({ text, icon, onClick }, index) => (
          <MenuItem key={`${index}-${text}`} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
      <ChangeLanguageDialog
        open={isChangeLanguageDialogOpen}
        onClose={() => setIsChangeLanguageDialogOpen(false)}
      />
    </>
  );
}
