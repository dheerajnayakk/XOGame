import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xStarts, setXStarts] = useState(true);
  const [xIsNext, setXIsNext] = useState(true);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const currentPlayerSymbol = xIsNext ? 'X' : 'O';
  const currentPlayerName = xIsNext ? playerX : playerO;

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayerSymbol;
    setBoard(newBoard);

    const checkWin = calculateWinner(newBoard);
    if (checkWin) {
      setScores(prev => ({
        ...prev,
        [currentPlayerSymbol]: prev[currentPlayerSymbol] + 1,
      }));
    }

    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXStarts(!xStarts);
    setXIsNext(!xStarts);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
  };

  const handleNameChange = (e, player) => {
    if (player === 'X') setPlayerX(e.target.value);
    else setPlayerO(e.target.value);
  };

  const statusText = winner
    ? `${winner === 'X' ? playerX : playerO} Wins!`
    : isDraw
    ? 'It’s a Draw!'
    : `Turn: ${currentPlayerName}`;

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="names">
        <input
          type="text"
          value={playerX}
          onChange={(e) => handleNameChange(e, 'X')}
          className="name-input"
        />
        <span className="vs">vs</span>
        <input
          type="text"
          value={playerO}
          onChange={(e) => handleNameChange(e, 'O')}
          className="name-input"
        />
      </div>

      <div className="scoreboard">
        <div className="score score-x">{playerX}: {scores.X}</div>
        <div className="score score-o">{playerO}: {scores.O}</div>
      </div>

      <div className={`status ${winner || isDraw ? 'status-final' : ''}`}>{statusText}</div>

      <div className="board">
        {board.map((cell, i) => (
          <div key={i} className="cell" onClick={() => handleClick(i)}>
            {cell}
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="reset" onClick={resetGame}>New Game</button>
        <button className="reset reset-scores" onClick={resetScores}>Reset Scores</button>
      </div>
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default App;
