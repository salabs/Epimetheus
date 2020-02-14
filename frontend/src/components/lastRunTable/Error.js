import React from 'react';

const Error = ({ build }) => {
  const errorMessage = build.messages[0] || '';
  const CHARACTER_LIMIT = 200;

  if (errorMessage !== '' && errorMessage.message.length > CHARACTER_LIMIT) {
    errorMessage.message =
      errorMessage.message.substring(0, CHARACTER_LIMIT) + '...';
  }

  return <td>{errorMessage.message}</td>;
};

export default Error;
