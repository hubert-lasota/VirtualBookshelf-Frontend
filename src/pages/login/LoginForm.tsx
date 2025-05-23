import { useSignIn } from "../../features/auth/authClient.js";
import {
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useGetLoginFormMessages from "./useGetLoginFormMessages.js";

export default function LoginForm() {
  const { handleSubmit, register, formState } = useForm({
    mode: "all",
  });
  const messages = useGetLoginFormMessages();
  const { mutate: signInRequest, isPending, apiError } = useSignIn();

  const onSubmit = (formData: any) => {
    signInRequest(formData);
  };
  console.log("formState", formState);
  const usernameError = formState.errors.username?.message;
  const passwordError = formState.errors.password?.message;
  return (
    <Paper
      component="form"
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
        boxShadow:
          "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="h4" component="h1">
          {messages.title}
        </Typography>
        <TextField
          {...register("username", { required: messages.username.required })}
          label={messages.username.label}
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          {...register("password", { required: messages.password.required })}
          label={messages.password.label}
          error={!!passwordError}
          helperText={passwordError}
          type="password"
        />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Typography>{messages.register.linkPrefix}</Typography>
          <Link sx={{ cursor: "pointer" }}>{messages.register.linkLabel}</Link>
        </Stack>

        <Button
          variant="contained"
          size="medium"
          loading={isPending}
          type="submit"
        >
          {messages.title}
        </Button>
        {apiError && <Typography color="error">{apiError.message}</Typography>}
      </Stack>
    </Paper>
  );
}
