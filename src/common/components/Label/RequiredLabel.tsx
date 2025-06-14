import { Box } from "@mui/material";

export default function RequiredLabel({ text }: { text: string }) {
  return (
    <>
      {text}
      <Box
        component="span"
        sx={(theme) => ({ color: theme.palette.error.main })}
      >
        {" *"}
      </Box>
    </>
  );
}
