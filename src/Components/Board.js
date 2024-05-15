import React, { useEffect, useState } from 'react';
import Square from './Square';
import "./Board.css";

const Board = () => {
    const frameArr = Array(3).fill(null);
    const outerArr = frameArr.slice().map(item => frameArr.slice());
    const [squares, setSquares] = useState(outerArr);
    const [xIsNext, setXIsNext] = useState(true);
    const bCount = 3;
    let cnt_axisX = 0;
    let cnt_axisY = 0;
    let cnt_diagonal = 0;
    let cnt_diagonal_r = 0;
    const [isWinner, setIsWinner] = useState(null);

    const status = `${!isWinner ? 'Next player : ' : 'The Winner is : '} ${xIsNext ? 'X' : 'O'}`;
    const handleClick = ({x,y}) => {
        if(squares[x][y] || isWinner) return;
        const newSquares = squares.slice();
        newSquares[x][y] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        if(checkWinner({x,y})) {setIsWinner(true); return;}
        setXIsNext(prevState => !prevState);
    }


    const checkWinner = ({x,y}) => {
        const value = squares[x][y];
        for(let i=0; i<bCount; i++){
            if(value == squares[x][i]) cnt_axisX++;        
            if(value == squares[i][y]) cnt_axisY++;    
            if((x==y)&&(value == squares[i][i])) cnt_diagonal++;
            if((x+y == bCount-1)&&(value == squares[i][bCount-1-i])) cnt_diagonal_r++;
        }
        return cnt_axisX>=bCount||cnt_axisY>=bCount||cnt_diagonal>=bCount||cnt_diagonal_r>=bCount;
    }


    //import한 컴포넌트를 직접 삽입하기보다 컴포넌트를 리턴하는 함수를 만들어주는게 좋다.(간결)
    const renderSquare = ({x,y}) => {
        return (
        <Square 
            value={squares[x][y]} 
            onClick={()=>{handleClick({x,y})}}
        />
        )
    }

    return (
        <div>
            <div className="status">{status}</div>

            <div className="board-row">
                {renderSquare({x:0,y:0})}
                {renderSquare({x:0,y:1})}
                {renderSquare({x:0,y:2})}
            </div>
            <div className="board-row">
                {renderSquare({x:1,y:0})}
                {renderSquare({x:1,y:1})}
                {renderSquare({x:1,y:2})}
            </div>
            <div className="board-row">
                {renderSquare({x:2,y:0})}
                {renderSquare({x:2,y:1})}
                {renderSquare({x:2,y:2})}
            </div>
        </div>
    );
}

export default Board;