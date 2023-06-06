import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Icon, { Star, StarFill } from "react-bootstrap-icons";

interface RateProps {
  count: number;
  rating: number;
  color: {
    filled: string;
    unfilled: string;
  };
  onRating: (rating: number) => void;
}

const Rate: React.FC<RateProps> = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [averageRating, setAverageRating] = useState(rating);

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <span
          key={idx}
          className="cursor-pointer"
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        >
          {hoverRating >= idx ? <StarFill /> : <Star />}
        </span>
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

Rate.propTypes = {
  count: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  onRating: PropTypes.func.isRequired,
  color: PropTypes.shape({
    filled: PropTypes.string.isRequired,
    unfilled: PropTypes.string.isRequired,
  }).isRequired,
};

export default Rate;
