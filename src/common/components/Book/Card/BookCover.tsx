import { CardMedia, CardMediaProps, Stack } from "@mui/material";
import { useBookContext } from "./BookContext";
import { BookOpen as BookOpenIcon } from "lucide-react";

export default function BookCover({ sx, ...props }: CardMediaProps) {
  const { title, coverUrl } = useBookContext();

  return coverUrl ? (
    <CardMedia
      image={coverUrl || "src/assets/book_cover.jpg"}
      title={title}
      component="img"
      sx={sx}
      {...props}
    />
  ) : (
    <Stack
      sx={[
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <BookOpenIcon
        style={{
          width: "45px",
          height: "45px",
          color: "rgb(147 197 253)",
        }}
      />
    </Stack>
  );
}
