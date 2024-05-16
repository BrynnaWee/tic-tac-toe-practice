import React, { useEffect, useLayoutEffect, useState } from 'react';
import Square from './Square';
import "./Board.css";

const Board = ({squares,setSquares,historyMode,addHistory}) => {
    const [xIsNext, setXIsNext] = useState(true);
    const [clickCnt,setClickCnt] = useState(0);
    const bCount = 3;
    let cnt_axisX = 0;
    let cnt_axisY = 0;
    let cnt_diagonal = 0;
    let cnt_diagonal_r = 0;
    const [isWinner, setIsWinner] = useState(null);

    const status = `${!isWinner ? 'Next player : ' : 'The Winner is : '} ${xIsNext ? 'X' : 'O'}`;
    const handleClick = ({x,y}) => {
        if(squares[x][y] || isWinner || historyMode) return;
        const newSquares = squares.slice();
        newSquares[x][y] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        addHistory(JSON.stringify(newSquares));
        if(checkWinner({x,y})) {setIsWinner(true);} 
        setClickCnt(prev => prev+1);        
    }

    useEffect(() => {
        console.log(clickCnt)
        if(clickCnt < Math.pow(bCount,2)){
            setXIsNext(prevState => !prevState);   
        }else {
            setTimeout(()=>{alert('게임 끝')},0); 
            //setTimeout을 해주지 않으면 이 구문을 읽어서 메모리에 적재하는 과정에서 alert이 화면 렌더링보다 먼저 실행됨
        }
    }, [clickCnt]);

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
            <div className="status">{clickCnt}</div>

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