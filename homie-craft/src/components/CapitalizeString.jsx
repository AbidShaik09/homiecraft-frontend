import React from 'react';
import { Typography } from '@mui/material';

const CapitalizeString = ({ text }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const capitalizeAfterFullStop = (str) => {
    return str
      .split('. ')
      .map(sentence => capitalizeFirstLetter(sentence))
      .join('. ');
  };

  const formattedText = capitalizeAfterFullStop(text);

  return (
    <Typography variant="body1">
      {formattedText}
    </Typography>
  );
};

export default CapitalizeString;
