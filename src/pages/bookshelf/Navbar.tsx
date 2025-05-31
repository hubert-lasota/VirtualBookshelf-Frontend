import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Tabs,
  Tab,
  alpha,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Sun,
  Moon,
  Search as SearchIcon,
  X as CloseIcon,
} from "lucide-react";
import { ShelfType } from "./models";
import { useBooks } from "./context";

interface NavbarProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentShelf, setCurrentShelf, setSearchTerm, searchTerm } =
    useBooks();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: ShelfType,
  ) => {
    setCurrentShelf(newValue);
    handleMobileMenuClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ flexGrow: 0, display: "flex", mr: 2 }}
        >
          Bookshelf
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchorEl}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem
                onClick={() =>
                  handleTabChange({} as React.SyntheticEvent, "all")
                }
              >
                All Books
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleTabChange({} as React.SyntheticEvent, "toRead")
                }
              >
                To Read
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleTabChange({} as React.SyntheticEvent, "reading")
                }
              >
                Currently Reading
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleTabChange({} as React.SyntheticEvent, "read")
                }
              >
                Read
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Tabs
            value={currentShelf}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ flexGrow: 1 }}
          >
            <Tab label="All Books" value="all" />
            <Tab label="To Read" value="toRead" />
            <Tab label="Currently Reading" value="reading" />
            <Tab label="Read" value="read" />
          </Tabs>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            "&:hover": {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            mr: 2,
            ml: 0,
            width: "auto",
          }}
        >
          <Box
            sx={{
              padding: theme.spacing(0, 2),
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon size={20} />
          </Box>
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              color: "inherit",
              "& .MuiInputBase-input": {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  width: "20ch",
                },
              },
            }}
          />
          {searchTerm && (
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                color: "inherit",
              }}
              onClick={clearSearch}
            >
              <CloseIcon size={16} />
            </IconButton>
          )}
        </Box>

        <Tooltip
          title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        >
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
