import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.clickCounter = 0;
    this.gameOver = false;
    this.xTurn = true;
    this.x = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    this.messages = React.createRef();

    this.clickSquare = this.clickSquare.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  render() {
    return (
      <div className="canvas">
        <div className="board">
          <div id="1" onClick={this.clickSquare} className="square top left">&nbsp;</div>
          <div id="2" onClick={this.clickSquare} className="square top">&nbsp;</div>
          <div id="3" onClick={this.clickSquare} className="square top right">&nbsp;</div>
          <div id="4" onClick={this.clickSquare} className="square left">&nbsp;</div>
          <div id="5" onClick={this.clickSquare} className="square">&nbsp;</div>
          <div id="6" onClick={this.clickSquare} className="square right">&nbsp;</div>
          <div id="7" onClick={this.clickSquare} className="square bottom left">&nbsp;</div>
          <div id="8" onClick={this.clickSquare} className="square bottom">&nbsp;</div>
          <div id="9" onClick={this.clickSquare} className="square bottom right">&nbsp;</div>
        </div>
        <input id="newGameButton" type="button" value="New Game" onClick={this.newGame}/>
        <div id="messages" ref="messages"></div>
      </div>
    );
  }

  clickSquare(event) {
    if (this.gameOver) {
      return;
    }

    const square = event.target;

    if(square.textContent !== "X" && square.textContent !== "O") {
      if(this.xTurn) {
        square.textContent = "X";
        this.refs.messages.textContent = "O's turn";
      }
      else {
        square.textContent = "O";
        this.refs.messages.textContent = "X's turn";
      }

      this.clickCounter++;
      this.fillArray(square.id);
      this.xTurn = !this.xTurn;
    }
  }

  fillArray(squareId) {
    if (!this.xTurn)
      this.x[squareId - 1] = 1;
    else {
      this.x[squareId - 1] = 5;
    }

    const score = this.updateScore();
    
    if (score !== "") {
      this.refs.messages.textContent = score;
      this.gameOver = true;
      this.drawWinnerLine();
    } else if(this.clickCounter >= 9) {
      this.refs.messages.textContent = "Draw";
      this.gameOver = true;
    }
  }

  updateScore() {
    let t = "";

    // row wins
    if (this.x[0] + this.x[1] + this.x[2] === 3)  { t = "O wins!"; this.drawWinnerLine("r1"); }
    if (this.x[0] + this.x[1] + this.x[2] === 15) { t = "X wins!"; this.drawWinnerLine("r1"); }
    if (this.x[3] + this.x[4] + this.x[5] === 3)  { t = "O wins!"; this.drawWinnerLine("r2"); }
    if (this.x[3] + this.x[4] + this.x[5] === 15) { t = "X wins!"; this.drawWinnerLine("r2"); }
    if (this.x[6] + this.x[7] + this.x[8] === 3)  { t = "O wins!"; this.drawWinnerLine("r3"); }
    if (this.x[6] + this.x[7] + this.x[8] === 15) { t = "X wins!"; this.drawWinnerLine("r3"); }

    // column wins
    if (this.x[0] + this.x[3] + this.x[6] === 3)  { t = "O wins!"; this.drawWinnerLine("c1"); }
    if (this.x[0] + this.x[3] + this.x[6] === 15) { t = "X wins!"; this.drawWinnerLine("c1"); }
    if (this.x[1] + this.x[4] + this.x[7] === 3)  { t = "O wins!"; this.drawWinnerLine("c2"); }
    if (this.x[1] + this.x[4] + this.x[7] === 15) { t = "X wins!"; this.drawWinnerLine("c2"); }
    if (this.x[2] + this.x[5] + this.x[8] === 3)  { t = "O wins!"; this.drawWinnerLine("c3"); }
    if (this.x[2] + this.x[5] + this.x[8] === 15) { t = "X wins!"; this.drawWinnerLine("c3"); }

    // diagonal wins
    if (this.x[0] + this.x[4] + this.x[8] === 3)  { t = "O wins!"; this.drawWinnerLine("d1"); }
    if (this.x[0] + this.x[4] + this.x[8] === 15) { t = "X wins!"; this.drawWinnerLine("d1"); }
    if (this.x[2] + this.x[4] + this.x[6] === 3)  { t = "O wins!"; this.drawWinnerLine("d2"); }
    if (this.x[2] + this.x[4] + this.x[6] === 15) { t = "X wins!"; this.drawWinnerLine("d2"); }

    return t;
  }

  drawWinnerLine(lineType) {
    // TODO:
  }

  newGame() {
    const squares = document.getElementsByClassName("square");
      
      for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = " ";
      }

      this.x.fill(0);
      this.xTurn = true;
      this.clickCounter = 0;
      this.gameOver = false;

      this.refs.messages.textContent = "X's turn";
  }
}

export default App;