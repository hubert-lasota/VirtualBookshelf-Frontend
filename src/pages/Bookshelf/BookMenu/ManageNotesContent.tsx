import { DialogContent } from "@mui/material";
import { useFieldArray } from "react-hook-form";

export default function ManageNotesContent() {
  const { fields, append, remove } = useFieldArray({
    name: "notes",
  });

  return <DialogContent></DialogContent>;
}
