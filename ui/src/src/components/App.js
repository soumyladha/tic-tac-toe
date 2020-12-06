
import '../../src/styles/App.css';
import React, { useState, useEffect } from 'react';

const utils = { range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i) }
const numberOfBoxes = utils.range(1, 9)
const OnClick = props => (<button className="number" onClick={() => props.handler(props.number, props.status)} style={{ backgroundColor: colors[props.status] }}  >{props.currentChar}</button>)

const colors = {
  available: 'deepskyblue',
  used: 'DarkOrange',
  winner: 'MediumSeaGreen',
  stop: 'Tomato',
};

const getCurrentChar = (count) => {
  if (count % 2 == 0) {
    return 'X';
  }
  return 'O';
}

const GetWinner = (storeChar) => {
  for (let i = 0; i < 3; i++) {
    let s = ""
    const winnerL = []
    for (let j = i; j < 9; j = j + 3) {
      s = s + storeChar[j];
      winnerL.push(j + 1);
    }
    if (s === 'XXX' || s === 'OOO') {
      console.log(winnerL)
      return winnerL
    }
    s = ""
    const winnerH = []
    for (let j = 3 * i; j < (i + 1) * 3; j = j + 1) {
      s = s + storeChar[j];
      winnerH.push(j + 1);
    }
    if (s === 'XXX' || s === 'OOO') {
      console.log(winnerH)
      return winnerH
    }
  }
  let s = ""
  const winnerD1 = []
  for (let i = 0; i < 9; i = i + 4) {
    s = s + storeChar[i]
    winnerD1.push(i + 1)
  }
  if (s === 'XXX' || s === 'OOO') {
    console.log(winnerD1)
    return winnerD1
  }
  s = ""
  const winnerD2 = []
  for (let i = 2; i < 8; i = i + 2) {
    s = s + storeChar[i]
    winnerD2.push(i + 1)
  }
  if (s === 'XXX' || s === 'OOO') {
    console.log(winnerD2)
    return winnerD2
  }
  return []
}




const StarMatch = () => {
  const [availableBox, setAvailableBox] = useState(utils.range(1, 9));
  const [stop, setStop] = useState([])
  const [winner, setWinner] = useState([]);
  const [storeChar, setStoreChar] = useState(utils.range(1, 9).map(number => ''));
  let [count, setCount] = useState(0);
  const numberStatus = (number) => {

    if (winner.includes(number)) {
      return 'winner'
    }
    if (availableBox.includes(number)) {
      return 'available';
    }
    if (stop.includes(number)) {
      return 'stop'
    }
    return 'used'
  };
  const OnClickhandler = (number, currentStatus) => {
    if (currentStatus == 'used' || currentStatus == 'stop' || currentStatus == 'winner') {
      return;
    } else {
      const newAvailableBox = availableBox.filter(function (e) {
        return e !== number
      })
      setAvailableBox(newAvailableBox);
      setCount(count + 1)
      storeChar[number - 1] = getCurrentChar(count)
      setStoreChar(storeChar)
      if (GetWinner(storeChar).length > 0) {
        setWinner(GetWinner(storeChar))
        setStop(availableBox)
        setAvailableBox([])
      }

    }
  }





  return (
    <div className="game">
      <div className="body">
        <div className="right">
          <div>You play X</div>
          {numberOfBoxes.map(number => <OnClick key={number} number={number} status={numberStatus(number)} handler={OnClickhandler} currentChar={storeChar[number - 1]} />)}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (<StarMatch />);
}
