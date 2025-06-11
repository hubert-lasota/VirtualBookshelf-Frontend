import { Paper, PaperProps } from "@mui/material";

type ConfigTabProps = {
  name: string;
};

export default function ConfigTab({
  name,
  onClick,
}: ConfigTabProps & Pick<PaperProps, "onClick">) {
  return (
    <Paper variant="outlined" onClick={onClick}>
      {name}
    </Paper>
  );
}
