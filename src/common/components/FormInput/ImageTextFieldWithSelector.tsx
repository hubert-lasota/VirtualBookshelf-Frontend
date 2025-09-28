import { useController } from "react-hook-form";
import { useUserContext } from "../../auth/UserContext";
import {
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import OptionalLabel from "../Label/OptionalLabel";
import ImageSelector from "./ImageSelector";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type ImageTextFieldWithSelectorProps = {
  name: string;
} & Omit<TextFieldProps, "value" | "onChange">;

export default function ImageTextFieldWithSelector({
  name,
  ...rest
}: ImageTextFieldWithSelectorProps) {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const {
    field: { value, onChange, ref, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name });

  const isFile = value instanceof File;

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <TextField
        inputRef={ref}
        fullWidth
        value={(isFile ? value.name : value) || ""}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value === "" ? undefined : value);
        }}
        label={
          <OptionalLabel
            text={
              isPlLanguage ? "Zdjęcie (Link lub Plik)" : "Image (Link or File)"
            }
          />
        }
        slotProps={{
          input: {
            endAdornment: (
              <Stack direction="row">
                <Tooltip
                  title={
                    isImageVisible
                      ? isPlLanguage
                        ? "Ukryj zdjęcie"
                        : "Hide image"
                      : isPlLanguage
                        ? "Pokaż zdjęcie"
                        : "Show image"
                  }
                >
                  <IconButton
                    onClick={() => setIsImageVisible((prev) => !prev)}
                  >
                    {isImageVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </Tooltip>
                <ImageSelector onChange={onChange} />
              </Stack>
            ),
          },
        }}
        error={invalid}
        helperText={error?.message}
        {...restFieldProps}
        {...rest}
      />
      {isImageVisible && value && (
        <img
          src={
            isFile
              ? URL.createObjectURL(value)
              : typeof value === "string"
                ? value
                : undefined
          }
          alt={isPlLanguage ? "Okładka" : "Cover"}
          style={{ maxWidth: "100%", maxHeight: 300, objectFit: "contain" }}
        />
      )}
    </Stack>
  );
}
