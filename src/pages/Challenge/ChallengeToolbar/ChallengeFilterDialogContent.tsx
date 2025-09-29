import { Grid } from "@mui/material";
import { ChallengeFilter } from "../../../common/models/challengeModels";
import React from "react";
import ChallengeTypeSelect from "./ChallengeTypeSelect";
import SimpleDatePicker from "../../../common/components/Input/SimpleDatePicker";
import { useUserContext } from "../../../common/auth/UserContext";

type Props = {
  filter: ChallengeFilter;
  onFilterChange: React.Dispatch<React.SetStateAction<ChallengeFilter>>;
};

export default function ChallengeFilterDialogContent({
  filter,
  onFilterChange,
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleChange = (key: keyof ChallengeFilter, value: unknown) =>
    onFilterChange({ ...filter, [key]: value });

  const components = [
    <SimpleDatePicker
      label={isPlLanguage ? "Data rozpoczęcia" : "Start date"}
      value={filter?.durationRange?.lte}
      onChange={(date) =>
        handleChange("durationRange", {
          lte: date,
          gte: filter?.durationRange?.gte,
        })
      }
    />,
    <SimpleDatePicker
      label={isPlLanguage ? "Data zakończenia" : "End date"}
      value={filter?.durationRange?.gte}
      onChange={(date) =>
        handleChange("durationRange", {
          gte: date,
          lte: filter?.durationRange?.lte,
        })
      }
    />,
    <ChallengeTypeSelect
      type={filter.type}
      onTypeChange={(type) => handleChange("type", type)}
    />,
    // <ParticipatingSelect
    //   participating={filter.participating}
    //   onParticipatingChange={(participating) =>
    //     handleChange("participating", participating)
    //   }
    // />,
  ];

  return (
    <Grid container spacing={2}>
      {components.map((c) => (
        <Grid size={6}>{c}</Grid>
      ))}
    </Grid>
  );
}
