import { IconButton, Tooltip } from "@mui/material";
import { ChangeEvent } from "react";
import { useUserContext } from "../../../features/user/UserContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type ImageSelectorProps = {
  onChange: (file: File | undefined) => void;
};

export default function ImageSelector({ onChange }: ImageSelectorProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file);
  };

  return (
    <>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        max={1}
        multiple={false}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="icon-button-file">
        <Tooltip
          title={isPlLanguage ? "Dodaj zdjęcie okładki" : "Add cover image"}
        >
          <IconButton component="span">
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
      </label>
    </>
  );
}
