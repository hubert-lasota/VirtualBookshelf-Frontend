import { Grid, Stack, Typography } from "@mui/material";
import { StatTab } from "./models";
import { useUserContext } from "../../common/auth/UserContext";

type TabListProps = {
  tab: StatTab;
  onTabChange: (tab: StatTab) => void;
};

export default function TabList({ tab, onTabChange }: TabListProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const tabs = [
    {
      value: StatTab.PROGRESS,
      label: isPlLanguage ? "Postęp miesięczny" : "Monthly progress",
    },
    {
      value: StatTab.GENRE,
      label: isPlLanguage ? "Gatunki" : "Genres",
    },
    {
      value: StatTab.BOOK_LENGTH,
      label: isPlLanguage ? "Długość książek" : "Book length",
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.secondary,
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(0.5),
        overflowX: "auto",
      })}
    >
      {tabs.map(({ value, label }) => (
        <Grid size={4}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            onClick={() => onTabChange(value)}
            sx={(theme) => ({
              paddingBlock: theme.spacing(1),
              paddingInline: theme.spacing(3),
              cursor: "pointer",
              borderRadius: theme.shape.borderRadius,
              backgroundColor:
                value === tab
                  ? theme.palette.background.default
                  : theme.palette.background.secondary,
              color:
                value === tab
                  ? theme.palette.text.primary
                  : theme.palette.primary.main,
              fontWeight: value === tab ? 600 : 500,
            })}
          >
            <Typography>{label}</Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
