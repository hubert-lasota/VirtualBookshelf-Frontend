import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "../../features/user/UserContext";

const createScheme = (isPlLanguage: boolean) =>
  z.object({
    name: z
      .string()
      .min(
        1,
        isPlLanguage
          ? "Nazwa musi mieć minimum 1 znak"
          : "Name must be at least 1 character long",
      ),
  });

type BookshelfCreateScheme = z.infer<ReturnType<typeof createScheme>>;
// TODO do utworzenia przycisk w dolnym prawym rogu, ktory będzie zarządzał regałami itp "dodaj +" powinno do niego przekierować
export default function BookshelfDialogForm({
  open,
  onClose,
}: Pick<DialogProps, "open" | "onClose">) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { handleSubmit } = useForm<BookshelfCreateScheme>();

  const onSubmit = (bookshelf: BookshelfCreateScheme) => {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        },
      }}
    >
      <DialogTitle>Add bookshelf</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
