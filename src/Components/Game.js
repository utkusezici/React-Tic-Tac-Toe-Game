import React, { Component } from 'react'

import Board from './Board'
export default class Game extends Component {
    constructor(props){
        super(props);
        this.state =  {
            turnX : true,
            stepNumber : 0,
            history : [
                {squares: Array(9).fill(null)}
            ]

        }

    }
    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1)
        const current = history[history.length-1]
        const squares = current.squares.slice(); 
        const winner = calculateWinner(squares)
        if(winner || squares[i]){
            return;
        }
        squares[i] = this.state.turnX ? "X" : "O" ;
        this.setState({
            history : history.concat({
                squares: squares
            }),
            turnX : !this.state.turnX,
            stepNumber : history.length
        })
        console.log(squares);
    }
    newGame(){
        this.setState({
            turnX : true,
            stepNumber : 0,
            history : [
                {squares: Array(9).fill(null)}
            ]
        })
    }
    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if(winner){
            status = 'Winner is = ' + winner
        }else{
            status = 'Next player = ' + (this.state.turnX ? 'X' : 'O');
        }
        return (
            <div className="game">
                <h1>Tic Tac Toe</h1>
                <div className="game-board">
                    <Board onClick={(i)=>this.handleClick(i)} 
                    squares={current.squares}/>

                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button className="newGameButton" onClick={()=>this.newGame()}>New Game</button>
                </div>
                
            </div>
        )
    }
}

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] ===squares[c]){
            return squares[a]
        }
    }
    return null;
}