import React, { useEffect, useLayoutEffect, useState, useMemo } from 'react';
import './App.css';
import Board from './Components/Board';

function App() {

  const [history, setHistory] = useState(Array(0));
  const [historyMode, sethistoryMode] = useState(false);
  const frameArr = Array(3).fill(null);
  const outerArr = frameArr.slice().map(item => frameArr.slice());
  const [squares, setSquares] = useState(outerArr);
  const [current, setCurrent] = useState(0);


  const onChangeHistory = (idx) => {
    console.log('changemode')
    sethistoryMode(true);
    console.log('history[idx]',history[idx]);
    setSquares(history[idx]);
  }

  const onChangeMode = (value) => {
    if(value){
      sethistoryMode(true);
    }else{
      sethistoryMode(false);
      const current = history.length-1;
      //history배열에 들어있는 최신 squares배열은 깊은 복사를 해주어야 한다.
      //그렇지 않으면 board컴포넌트에서 setSquare를 할 때 내부 배열은 참조값이 복사되어서
      //최신 히스토리 배열이 게임모드에서 새로 설정되는 배열과 같아진다. 
      setSquares(JSON.parse(JSON.stringify(history[current])));
    }
  }

  const addHistory = (newSquares) => {
    
    const newHistory = history.concat([JSON.parse(newSquares)]);
    
    //전개연산자로 넣어주기
    //const newHistory = [...history, [JSON.parse(newSquares)] ];

    setHistory(newHistory);
    setCurrent(prev=>prev+1);
    console.log(newHistory);
  }

  const renderHistory = (idx) => (
    <li key={idx} onClick={()=>onChangeHistory(idx)}>
      {idx+1}.번째 : {(idx%2==0)? 'X' : 'O'}
    </li>
  );


  return (
    <div className="game">
      <div className="game-board">
        <Board 
        squares={squares} 
        setSquares={setSquares} 
        historyMode={historyMode}
        addHistory={addHistory}
        />     
        <div className="modeBtnWrap">
        <button 
        style={{'backgroundColor':`${historyMode?'gray':'blue'}`}}
        onClick={()=>onChangeMode(false)}>게임모드</button>
        <button 
        style={{'backgroundColor':`${historyMode?'blue':'gray'}`}}
        onClick={()=>onChangeMode(true)}>히스토리모드</button>
      </div>   
      </div>
      
      <div className="game-info">        
        <ol><h4>히스토리 추적</h4>
          {history.map((item,idx)=>renderHistory(idx))}</ol>
      </div>
      
    </div>
  );
}

export default App;
