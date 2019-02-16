import React from 'react';

const withErrorHandling  = WrappedComponent => ({ showError, message, children }) => {
  return (
    <WrappedComponent>
      {showError && <div style={errorMessages}>{message ? message : 'Oops! Something went wrong!'}</div>}
      {children}
    </WrappedComponent>
  );
};

const errorMessages = {
  backgroundColor: '#ff7272',
  color: 'white',
  padding: '1em'
};

export default withErrorHandling ;

