import React, { useState } from 'react';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);

    const newNextValue = calculateNextValue(newSquares);
    setNextValue(newNextValue);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
  }

  function renderSquare(i) {
    return (
      <button className="bg-stone-300 hover:bg-stone-500 text-black text-xl font-bold py-10 px-10 rounded" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-[48px] text-white font-bold mb-8"><h1>Tic Tac Toe in <span className="text-[48px] text-cyan-500 font-bold mb-8">React</span></h1></div>
      <div className="text-xl text-white font-bold mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-4 mx-auto p-4 shadow rounded">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid grid-cols-3 gap-4 mx-auto p-4 shadow rounded">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid grid-cols-3 gap-4 mx-auto p-4 shadow rounded">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={reset} className="bg-violet-500 hover:bg-violet-700 text-black font-bold py-2 px-4 rounded">Restart</button>
    </div>
  );
}

function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Congratulations: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
