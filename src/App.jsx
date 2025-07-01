import React, { useState, useCallback } from 'react';
import CounterButton from './CounterButton';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  console.log(' App render');

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Count: {count}</h1>
      <CounterButton onClick={handleIncrement} />

      <input
        className="mt-2 p-2 border border-gray-300 rounded w-full"
        placeholder="Gõ gì đó để test..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
