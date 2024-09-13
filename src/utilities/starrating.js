import React from 'react';
import { Pane, Icon } from 'evergreen-ui';

const StarRating = ({ max, value, onChange }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    stars.push(
      <Icon
        key={i}
        icon="star"
        color={i <= value ? "warning" : "muted"}
        size={24}
        cursor="pointer"
        onClick={() => onChange(i)}
      />
    );
  }

  return <Pane display="flex">{stars}</Pane>;
};

export default StarRating;
