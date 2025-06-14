import { Box, Button, ButtonProps, Divider, Stack } from "@mui/material";

type FormActionButtonsProps = {
  cancelBtnProps: ButtonProps;
  submitBtnProps: ButtonProps;
};

export default function FormActionButtons({
  cancelBtnProps,
  submitBtnProps,
}: FormActionButtonsProps) {
  return (
    <Box>
      <Divider
        sx={(theme) => ({
          marginBottom: theme.spacing(1),
          borderBottomWidth: "1.5px",
        })}
      />
      <Stack
        direction="row"
        gap={1.5}
        sx={{ width: "100%", justifyContent: "flex-end" }}
      >
        <Button {...cancelBtnProps} />
        <Button variant="contained" {...submitBtnProps} />
      </Stack>
    </Box>
  );
}
