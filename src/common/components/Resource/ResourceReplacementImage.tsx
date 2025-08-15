import { Stack, StackProps, useTheme } from "@mui/material";
import { mergeSx } from "../../utils";
import React from "react";

type ResourceReplacementImageProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
} & StackProps;

export default function ResourceReplacementImage({
  sx,
  icon,
  ...props
}: ResourceReplacementImageProps) {
  const theme = useTheme();

  const Icon = icon;
  return (
    <Stack
      sx={mergeSx(
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary["50"]}, ${theme.palette.primary["100"]})`,
        },
        sx,
      )}
      {...props}
    >
      <Icon
        style={{
          width: "45px",
          height: "45px",
          color: theme.palette.primary["300"],
        }}
      />
    </Stack>
  );
}
