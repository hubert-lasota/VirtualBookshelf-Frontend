import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBookDetailsContext } from "../BookDetailsContext";

export default function BookAuthorLinks() {
  const { authors } = useBookDetailsContext();
  const navigate = useNavigate();

  return (
    <Typography variant="subtitle1" color="textSecondary">
      {authors.map((a, index) => (
        <Link
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate(`/authors/${a.id}`)}
        >
          {a.fullName}
          {index < authors.length - 1 ? ", " : ""}
        </Link>
      ))}
    </Typography>
  );
}
