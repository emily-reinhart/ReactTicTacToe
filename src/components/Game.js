import React, { useState, Fragment } from 'react';
import { calculateWinner } from '../helpers';
import Board from './Board';
import '../style.css';

const styles = {
	width: '200px',
	margin: '20px auto',
	fontWeight: '700'
};
const buttonStyle = {
	borderRadius: '10px',
	border: 'none',
	backgroundColor: 'lightblue',
	padding: '10px',
	margin: '3px'
};

const Game = () => {
	const [ history, setHistory ] = useState([ Array(9).fill(null) ]);
	const [ stepNumber, setStepNumber ] = useState(0);
	const [ xIsNext, setXisNext ] = useState(true);
	const winner = calculateWinner(history[stepNumber]);

	const handleClick = (i) => {
		const timeInHistory = history.slice(0, stepNumber + 1);
		const current = timeInHistory[stepNumber];
		const squares = [ ...current ];
		// If user click an occupied square or if game is won, return
		if (winner || squares[i]) return;
		// Put an X or an O in the clicked square
		squares[i] = xIsNext ? 'X' : 'O';
		setHistory([ ...timeInHistory, squares ]);
		setStepNumber(timeInHistory.length);
		setXisNext(!xIsNext);
	};

	const jumpTo = (step) => {
		console.log(step);
		setStepNumber(step);
		setXisNext(step % 2 === 0);
		if (step === 0) {
			window.location.reload();
		}
	};

	const renderMoves = () =>
		history.map((_step, move) => {
			const destination = move ? `Go to Move #${move}` : 'Start New Game';
			return (
				<ul className="buttonList">
					<li key={move}>
						<button style={buttonStyle} onClick={() => jumpTo(move)}>
							{destination}
						</button>
					</li>
				</ul>
			);
		});

	return (
		<Fragment>
			<Board squares={history[stepNumber]} onClick={handleClick} />
			<div style={styles}>
				<p>
					{winner ? (
						'Winner! Player ' + winner
					) : history[stepNumber].includes(null) ? (
						'Next Player: ' + (xIsNext ? 'X' : 'O')
					) : (
						'Game Over, Nobody Wins'
					)}
				</p>
				{renderMoves()}
			</div>
		</Fragment>
	);
};

export default Game;
