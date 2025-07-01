import React from 'react';

function CounterButton({ onClick }) {
  console.log(' CounterButton render');
  return (
    <button onClick={onClick} className="btn btn-primary m-2">
      Tăng
    </button>
  );
}

export default React.memo(CounterButton);
