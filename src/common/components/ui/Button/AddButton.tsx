import { Button, ButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton(props: ButtonProps) {
  return <Button startIcon={<AddIcon />} variant="contained" {...props} />;
}
