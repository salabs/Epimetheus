import React from 'react';
import FA from 'react-fontawesome';

const TestStatusIcon = ({ type, text, iconColor }) => {
  return (
    <>
      <FA name={type} style={{ color: iconColor }} />
      <span className="sr-show">{text}</span>
    </>
  );
};

export default TestStatusIcon;
