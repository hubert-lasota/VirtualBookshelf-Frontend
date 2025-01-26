import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import css from "./star-rating.module.css";

export default function StarRating({
  initialRating = 0,
  onChange = () => {},
  readOnly = false,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (e, starIndex) => {
    if (readOnly) {
      return;
    }

    const star = e.currentTarget;
    const rect = star.getBoundingClientRect();
    const starWidth = rect.width;
    const mouseX = e.clientX - rect.left;

    const isHalfStart = mouseX < starWidth / 2;
    const currentRating = starIndex + (isHalfStart ? 0.5 : 1);

    setHoverRating(currentRating);
  };
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  const handleClick = (rating) => {
    if (readOnly) return;
    setRating(rating);
    onChange(rating);
  };

  const renderStar = (index) => {
    const currentRating = hoverRating || rating;
    const filled = currentRating >= index + 1;
    const half = currentRating === index + 0.5;

    return (
      <div
        key={index}
        className={css["container"]}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onClick={() => handleClick(hoverRating)}
        style={{ cursor: readOnly ? "default" : "pointer" }}
      >
        <div className={css["container"]}>
          <FaRegStar
            className={`${css["background"]} ${filled ? css["filled"] : ""}`}
          />
        </div>
        {half && (
          <div className={css["half"]}>
            <FaRegStar className={css["filled"]} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={css["star-rating"]} onMouseLeave={handleMouseLeave}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  );
}
