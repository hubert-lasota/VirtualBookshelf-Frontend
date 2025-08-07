import { useSignIn } from "../../common/api/clients/authClient.js";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserCredentialsSchema,
  UserCredentials,
} from "../../common/models/userModels";

const fieldNames = ["username", "password"] as const;

export default function LoginForm() {
  const messages = useGetLoginFormMessages();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCredentials>({
    mode: "all",
    resolver: zodResolver(createUserCredentialsSchema(messages)),
  });

  const { mutate: signInRequest, isPending, apiError } = useSignIn();

  const onSubmit = (formData: UserCredentials) => {
    signInRequest(formData);
  };

  return (
    <Paper
      component="form"
      variant="outlined"
      sx={(theme) => ({
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBlock: theme.spacing(5),
        paddingInline: theme.spacing(6),
        boxShadow:
          "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="column" spacing={2}>
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          color="textPrimary"
          paddingBottom={1}
        >
          {messages.title}
        </Typography>
        {fieldNames.map((name) => (
          <TextField
            key={`LoginFormField-${name}`}
            {...register(name)}
            label={messages[name].label}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            type={name === "password" ? "password" : "text"}
          />
        ))}
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
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
        {apiError && <Typography color="error">{apiError.detail}</Typography>}
      </Stack>
    </Paper>
  );
}
